import React, { useState } from 'react'

import styled from 'styled-components'

// components
import Title from '../../Components/StyledComponents/Title'
import CustomInput from '../../Components/StyledComponents/CustomInput'
import CustomForm from '../../Components/StyledComponents/CustomForm'

// utils
import { InsertMovie } from '../../Utils/Api'

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
			<CreateMoviesContainer>
				<Title title='Create Movies' />
				<CreateMoviesFormWrapper>
					<CustomForm buttonTitle='Create' onSubmit={Create}>
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
				</CreateMoviesFormWrapper>
			</CreateMoviesContainer>
		</>
	)
}

export default CreateMovies
