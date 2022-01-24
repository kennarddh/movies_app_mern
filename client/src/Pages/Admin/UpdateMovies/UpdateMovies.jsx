import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import styled from 'styled-components'

// Components
import Title from 'Components/StyledComponents/Title'
import CustomInput from 'Components/StyledComponents/CustomInput'
import CustomForm from 'Components/StyledComponents/CustomForm'

// Utils
import { UpdateMovieById, GetMovieById, AuthCheckLoggedIn } from 'Utils/Api'
import Clamp from 'Utils/Clamp'

// Context
import AuthConsumer from 'Contexts/Auth'

const UpdateMoviesContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`

const UpdateMoviesFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
`

const UpdateMovies = () => {
	const { IsLoggedIn, SetIsLoggedIn } = AuthConsumer()

	const { id } = useParams()

	const [Name, SetName] = useState('')
	const [Time, SetTime] = useState('')
	const [Rating, SetRating] = useState(0)
	const [Image, SetImage] = useState(null)

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
		let isMounted = true

		const AsyncGetMovie = async () => {
			await GetMovieById(id)
				.then(response => {
					const movie = response.data.data

					if (isMounted) {
						SetName(movie.name)
						SetTime(movie.time.join(', '))
						SetRating(movie.rating)
					}
				})
				.catch(() => alert("Movies don't exist"))
		}

		AsyncGetMovie()

		return () => {
			isMounted = false
		}
	}, [id])

	const Update = async () => {
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

		await UpdateMovieById(id, formData, token)
			.then(() => {
				alert('Movie updated successfully')
			})
			.catch(error => console.log(error))

		SetName('')
		SetTime('')
		SetRating(0)
		SetImage(null)
	}

	return (
		<>
			<UpdateMoviesContainer>
				<Title title='Update Movies' />
				<UpdateMoviesFormWrapper>
					<CustomForm buttonTitle='Update' onSubmit={Update}>
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
						/>
					</CustomForm>
				</UpdateMoviesFormWrapper>
			</UpdateMoviesContainer>
		</>
	)
}

export default UpdateMovies
