import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

// Contexts
import AuthConsumer from 'Contexts/Auth'

const ProtectedRoute = () => {
	const { IsLoggedIn } = AuthConsumer()

    if (IsLoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to='/auth/login' />
    }
}

export default ProtectedRoute
