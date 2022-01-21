import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import styled from 'styled-components'

// components
import Title from '../../../Components/StyledComponents/Title'
import CustomInput from '../../../Components/StyledComponents/CustomInput'
import CustomForm from '../../../Components/StyledComponents/CustomForm'

// utils
import { UpdateMovieById, GetMovieById } from '../../../Utils/Api'

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
	const { id } = useParams()

	const [Name, SetName] = useState('')
	const [Time, SetTime] = useState('')
	const [Rating, SetRating] = useState(0)

	useEffect(() => {
		const AsyncGetMovie = () => {
			GetMovieById(id)
				.then(response => {
					const movie = response.data.data

					SetName(movie.name)
					SetTime(movie.time.join(', '))
					SetRating(movie.rating)
				})
				.catch(() => alert("Movies don't exist"))
		}

		AsyncGetMovie()
	}, [id])

	const Update = async () => {
		await UpdateMovieById(id, {
			name: Name,
			time: Time.split(',').map(item => item.trim()),
			rating: Rating,
		})
			.then(() => {
				alert('Movie updated successfully')
			})
			.catch(error => console.log(error))

		SetName('')
		SetTime('')
		SetRating(0)
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
							onChange={value => SetName(value)}
						/>
						<CustomInput
							id='time'
							placeholder='Time'
							label='Time'
							type='text'
							value={Time}
							onChange={value => SetTime(value)}
						/>
						<CustomInput
							id='rating'
							placeholder='Rating'
							label='Rating'
							type='number'
							value={Rating}
							onChange={value =>
								SetRating(parseFloat(value).toFixed(1))
							}
							step='0.1'
							max='10'
							min='0'
						/>
					</CustomForm>
				</UpdateMoviesFormWrapper>
			</UpdateMoviesContainer>
		</>
	)
}

export default UpdateMovies
