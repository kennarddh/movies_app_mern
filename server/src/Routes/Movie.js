import express from 'express'

import multer from 'multer'

// Controllers
import {
	CreateMovie,
	UpdateMovie,
	DeleteMovie,
	GetMovieById,
	GetMovies,
	GetMoviesByAuthor,
} from '../Controllers/Movie'

// Middleware
import VerifyJWT from '../Middleware/VerifyJWT'
import VerifyMoviesAuthor from '../Middleware/VerifyMoviesAuthor'

// Utils
import Upload from '../Utils/Multer/Upload'

// Validation
import CreateMovieValidation from '../Validation/Movies/CreateMovie'

const Router = express.Router()

Router.post(
	'/movie',
	[VerifyJWT, Upload.single('image'), ...CreateMovieValidation()],
	CreateMovie
)
Router.put(
	'/movie/:id',
	[multer().none(), VerifyJWT, VerifyMoviesAuthor, Upload.single('image')],
	UpdateMovie
)
Router.delete('/movie/:id', [VerifyJWT, VerifyMoviesAuthor], DeleteMovie)
Router.get('/movie/:id', GetMovieById)
Router.get('/movies', GetMovies)
Router.get('/movies/author/:author_id', GetMoviesByAuthor)

export default Router
