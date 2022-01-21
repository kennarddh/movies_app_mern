import express from 'express'

// Controllers
import {
	CreateMovie,
	UpdateMovie,
	DeleteMovie,
	GetMovieById,
	GetMovies,
} from '../Controllers/Movie'

// Middleware
import VerifyJWT from '../Middleware/VerifyJWT'

const Router = express.Router()

Router.post('/movie', VerifyJWT, CreateMovie)
Router.put('/movie/:id', VerifyJWT, UpdateMovie)
Router.delete('/movie/:id', VerifyJWT, DeleteMovie)
Router.get('/movie/:id', GetMovieById)
Router.get('/movies', GetMovies)

export default Router
