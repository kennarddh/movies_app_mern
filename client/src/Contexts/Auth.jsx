import React, { useState, useEffect, createContext, useContext } from 'react'

import { AuthUserData } from 'Utils/Api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [IsLoggedIn, SetIsLoggedIn] = useState(true)

	useEffect(() => {
		let isMounted = true

		const AsyncAuthCheckIsLoggedIn = async () => {
			const token = window.localStorage.getItem('token')

			if (isMounted && !token) SetIsLoggedIn(false)

			await AuthUserData(token)
				.then(response => response.data)
				.then(data => {
					if (isMounted && !data.isLoggedIn) SetIsLoggedIn(false)
				})
				.catch(error => {
					if (isMounted && !error.response.data.isLoggedIn)
						SetIsLoggedIn(false)
				})
		}

		AsyncAuthCheckIsLoggedIn()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<>
			<AuthContext.Provider
				value={{
					IsLoggedIn,
					SetIsLoggedIn,
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
