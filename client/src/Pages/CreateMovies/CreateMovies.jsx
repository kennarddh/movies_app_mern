import React, { useState } from 'react'

// components
import Title from '../../Components/Title/Title'
import CustomInput from '../../Components/CustomInput/CustomInput'

// utils
import { InsertMovie } from '../../Utils/Api'

// styling
import './CreateMovies.css'

const CreateMovies = () => {
	const [Name, SetName] = useState('')
	const [Time, SetTime] = useState('')
	const [Rating, SetRating] = useState(0)

	const Create = () => {
		InsertMovie({
			name: Name,
			time: Time.split(',').map(item => item.trim()),
			rating: Rating,
		})
			.then(() => {
				alert('Movie created successfully')
			})
			.catch(error => console.log(error))

		SetName('')
		SetTime('')
		SetRating(0)
	}

	return (
		<>
			<div className='create-movies-container'>
				<Title title='Create Movies' />
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
							<button className='create-button' onClick={Create}>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CreateMovies
