import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

// components
import Title from '../../../Components/StyledComponents/Title'
import CustomInput from '../../../Components/StyledComponents/CustomInput'
import CustomForm from '../../../Components/StyledComponents/CustomForm'

// utils
import { AuthLogin } from '../../../Utils/Api'

// Contexts
import AuthConsumer from '../../../Contexts/Auth'

const LoginContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`

const LoginFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;
`

const Login = () => {
	const { SetIsLoggedIn, isLoggedIn } = AuthConsumer()

	const [Email, SetEmail] = useState('')
	const [Password, SetPassword] = useState('')

	const Navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn) Navigate('/admin')
	})

	const Login = async () => {
		await AuthLogin({
			email: Email,
			password: Password,
		})
			.then(response => response.data)
			.then(data => {
				window.localStorage.setItem('token', data.token)

				SetIsLoggedIn(true)

				Navigate('/admin')
			})
			.catch(() => alert('Invalid username or password'))
	}

	return (
		<>
			<LoginContainer>
				<Title title='Login' />
				<LoginFormWrapper>
					<CustomForm buttonTitle='Login' onSubmit={Login}>
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
				</LoginFormWrapper>
			</LoginContainer>
		</>
	)
}

export default Login
