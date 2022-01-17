import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

// components
import Title from '../../Components/Title/Title'
import CustomInput from '../../Components/CustomInput/CustomInput'

// utils
import { UpdateMovieById, GetMovieById } from '../../Utils/Api'

// styling
import './UpdateMovies.css'

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
			<div className='update-movies-container'>
				<Title title='Update Movies' />
				<div className='form-wrapper'>
					<div className='form'>
						<div className='input'>
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
						</div>
						<div className='button-wrapper'>
							<button className='create-button' onClick={Update}>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdateMovies
