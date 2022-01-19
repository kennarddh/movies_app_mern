import express from 'express'

// Controllers
import {
	CreateMovie,
	UpdateMovie,
	DeleteMovie,
	GetMovieById,
	GetMovies,
} from '../Controllers/Movie'

const Router = express.Router()

Router.post('/movie', CreateMovie)
Router.put('/movie/:id', UpdateMovie)
Router.delete('/movie/:id', DeleteMovie)
Router.get('/movie/:id', GetMovieById)
Router.get('/movies', GetMovies)

export default Router
