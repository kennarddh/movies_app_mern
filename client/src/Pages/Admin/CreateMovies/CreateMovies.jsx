import React, { useState } from 'react'

import styled from 'styled-components'

// components
import Title from 'Components/StyledComponents/Title'
import CustomInput from 'Components/StyledComponents/CustomInput'
import CustomForm from 'Components/StyledComponents/CustomForm'

// utils
import { InsertMovie } from 'Utils/Api'
import Clamp from 'Utils/Clamp'

const CreateMoviesContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`

const CreateMoviesFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
`

const CreateMovies = () => {
	const [Name, SetName] = useState('')
	const [Time, SetTime] = useState('')
	const [Rating, SetRating] = useState(0)
	const [Image, SetImage] = useState(null)

	const Create = async () => {
		const token = window.localStorage.getItem('token')

		const formData = new FormData()

		formData.append('name', Name)
		formData.append(
			'time',
			Time.split(',').map(item => item.trim())
		)
		formData.append('rating', parseFloat(Rating).toFixed(1))
		formData.append('image', Image)

		await InsertMovie(formData, token)
			.then(() => {
				alert('Movie created successfully')
			})
			.catch(error => console.log(error))

		SetName('')
		SetTime('')
		SetRating(0)
		SetImage(0)
	}

	return (
		<>
			<CreateMoviesContainer>
				<Title title='Create Movies' />
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
