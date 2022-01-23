import express from 'express'

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

const Router = express.Router()

Router.post('/movie', [VerifyJWT, Upload.single('image')], CreateMovie)
Router.put(
	'/movie/:id',
	[VerifyJWT, VerifyMoviesAuthor, Upload.single('image')],
	UpdateMovie
)
Router.delete('/movie/:id', [VerifyJWT, VerifyMoviesAuthor], DeleteMovie)
Router.get('/movie/:id', GetMovieById)
Router.get('/movies', GetMovies)
Router.get('/movies/author/:author_id', GetMoviesByAuthor)

export default Router
