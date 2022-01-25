import express from 'express'

// Controllers
import {
	Register,
	Login,
	GetUserData,
	IsUserLoggedIn,
} from '../Controllers/Authentication'

// Middleware
import VerifyJWT from '../Middleware/VerifyJWT'

// Validation
import RegisterValidation from '../Validation/Authentication/Register'
import LoginValidation from '../Validation/Authentication/Login'

const Router = express.Router()

Router.post('/auth/register', RegisterValidation(), Register)
Router.post('/auth/login', LoginValidation(), Login)
Router.get('/auth/user', VerifyJWT, GetUserData)
Router.get('/auth/check_logged_in', VerifyJWT, IsUserLoggedIn)

export default Router
