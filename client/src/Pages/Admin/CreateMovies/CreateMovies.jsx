import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

// Components
import Title from 'Components/StyledComponents/Title'
import CustomInput from 'Components/StyledComponents/CustomInput'
import CustomForm from 'Components/StyledComponents/CustomForm'

// Utils
import { InsertMovie, AuthCheckLoggedIn } from 'Utils/Api'
import Clamp from 'Utils/Clamp'

// Context
import AuthConsumer from 'Contexts/Auth'

const CreateMoviesContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const CreateMoviesFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
`

const CreateMoviesImagePreview = styled.img`
	width: 250px;
	height: 250px;
	border-radius: 15px;
	border: 1px solid #eee;
`

const CreateMovies = () => {
	const { IsLoggedIn, SetIsLoggedIn } = AuthConsumer()

	const [Name, SetName] = useState('')
	const [Time, SetTime] = useState('')
	const [Rating, SetRating] = useState(0)
	const [Image, SetImage] = useState(null)
	const [ImagePreview, SetImagePreview] = useState(null)

	useEffect(() => {
		let isMounted = true

		const AsyncAuthCheckLoggedIn = async () => {
			const token = window.localStorage.getItem('token')

			await AuthCheckLoggedIn(token).catch(error => {
				if (!error.isLoggedIn && isMounted) SetIsLoggedIn(false)
			})
		}

		AsyncAuthCheckLoggedIn()

		return () => {
			isMounted = false
		}
	}, [SetIsLoggedIn])

	useEffect(() => {
		if (Image !== null) SetImagePreview(URL.createObjectURL(Image))
	}, [Image])

	const Create = async () => {
		if (!IsLoggedIn) return

		const token = window.localStorage.getItem('token')

		const formData = new FormData()

		formData.append('name', Name)
		formData.append(
			'time',
			Time.split(',').map(item => item.trim())
		)
		formData.append('rating', parseFloat(Rating).toFixed(1))
		formData.append('image', Image)

		await AuthCheckLoggedIn(token)
			.then(async () => {
				await InsertMovie(formData, token).then(() => {
					alert('Movie created successfully')
				})
			})
			.catch(error => {
				if (!error.isLoggedIn) SetIsLoggedIn(false)
			})

		SetName('')
		SetTime('')
		SetRating(0)
		SetImage(0)
	}

	return (
		<>
			<CreateMoviesContainer>
				<Title title='Create Movies' />
				<CreateMoviesImagePreview src={ImagePreview} />
				<CreateMoviesFormWrapper>
					<CustomForm
						buttonTitle='Create'
						onSubmit={Create}
						encType='multipart/form-data'
					>
						<CustomInput
							id='name'
							placeholder='Name'
							label='Name'
							type='text'
							value={Name}
							onChange={event => SetName(event.target.value)}
							required
						/>
						<CustomInput
							id='time'
							placeholder='Time'
							label='Time'
							type='text'
							value={Time}
							onChange={event => SetTime(event.target.value)}
							required
						/>
						<CustomInput
							id='rating'
							placeholder='Rating'
							label='Rating'
							type='number'
							value={Rating}
							onChange={event => SetRating(event.target.value)}
							onBlur={() => {
								SetRating(
									Clamp(0, parseFloat(Rating).toFixed(1), 10)
								)
							}}
							step='0.1'
							max='10'
							min='0'
							required
						/>
						<CustomInput
							id='image'
							placeholder='Image'
							label={Image ? Image.name : 'Image'}
							type='file'
							accept='.png, .jpg, .jpeg'
							onChange={event => SetImage(event.target.files[0])}
							required
						/>
					</CustomForm>
				</CreateMoviesFormWrapper>
			</CreateMoviesContainer>
		</>
	)
}

export default CreateMovies
