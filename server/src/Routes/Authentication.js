import express from 'express'

// Controllers
import { Register, Login, GetUsername } from '../Controllers/Authentication'

// Middleware
import VerifyJWT from '../Middleware/VerifyJWT'

const Router = express.Router()

Router.post('/auth/register', Register)
Router.post('/auth/login', Login)
Router.get('/auth/username', VerifyJWT, GetUsername)

export default Router
