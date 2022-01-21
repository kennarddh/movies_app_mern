import React, { useState, useEffect, createContext, useContext } from 'react'

import { AuthCheckLoggedIn } from '../Utils/Api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [IsLoggedIn, SetIsLoggedIn] = useState(true)

	useEffect(() => {
		let isMounted = true

		const AsyncAuthCheckIsLoggedIn = async () => {
			const token = window.localStorage.getItem('token')

			if (isMounted && !token) SetIsLoggedIn(false)

			await AuthCheckLoggedIn(token).then(response => {
				if (isMounted && !response.data.isLoggedIn) SetIsLoggedIn(false)

				if (isMounted) SetIsLoggedIn(true)
			})
		}

		AsyncAuthCheckIsLoggedIn()

		return () => {
			isMounted = false
		}
	}, [])

	const Logout = () => {
		window.localStorage.removeItem('token')

		SetIsLoggedIn(false)

		alert('Logout successfully')
	}

	return (
		<>
			<AuthContext.Provider
				value={{
					IsLoggedIn,
					SetIsLoggedIn,
					Logout,
				}}
			>
				{children}
			</AuthContext.Provider>
		</>
	)
}

const AuthConsumer = () => {
	return useContext(AuthContext)
}

export default AuthConsumer
