import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

// components
import Title from '../../../Components/StyledComponents/Title'
import CustomInput from '../../../Components/StyledComponents/CustomInput'
import CustomForm from '../../../Components/StyledComponents/CustomForm'

// utils
import { AuthRegister } from '../../../Utils/Api'

// Contexts
import AuthConsumer from '../../../Contexts/Auth'

const RegisterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`

const RegisterFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
`

const Register = () => {
	const { IsLoggedIn } = AuthConsumer()

	const [Username, SetUsername] = useState('')
	const [Name, SetName] = useState('')
	const [Email, SetEmail] = useState('')
	const [Password, SetPassword] = useState('')

	const Navigate = useNavigate()

	useEffect(() => {
		if (IsLoggedIn) Navigate('/admin')
	}, [IsLoggedIn, Navigate])

	const Register = async () => {
		await AuthRegister({
			username: Username,
			name: Name,
			email: Email,
			password: Password,
		})
			.then(response => response.data)
			.then(() => {
				alert('User created successfully')
			})
			.catch(() => alert('Email or username already exist'))
	}

	return (
		<>
			<RegisterContainer>
				<Title title='Register' />
				<RegisterFormWrapper>
					<CustomForm buttonTitle='Register' onSubmit={Register}>
						<CustomInput
							id='username'
							placeholder='Username'
							label='Username'
							type='text'
							value={Username}
							onChange={value => SetUsername(value)}
						/>
						<CustomInput
							id='name'
							placeholder='Name'
							label='Name'
							type='text'
							value={Name}
							onChange={value => SetName(value)}
						/>
						<CustomInput
							id='email'
							placeholder='Email'
							label='Email'
							type='text'
							value={Email}
							onChange={value => SetEmail(value)}
						/>
						<CustomInput
							id='password'
							placeholder='Password'
							label='Password'
							type='password'
							value={Password}
							onChange={value => SetPassword(value)}
						/>
					</CustomForm>
				</RegisterFormWrapper>
			</RegisterContainer>
		</>
	)
}

export default Register
