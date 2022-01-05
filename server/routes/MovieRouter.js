import express from 'express'

import {
	CreateMovie,
	UpdateMovie,
	DeleteMovie,
	GetMovieById,
	GetMovies,
} from '../controllers/MovieController.js'

const router = express.Router()

router.post('/movie', CreateMovie)
router.put('/movie/:id', UpdateMovie)
router.delete('/movie/:id', DeleteMovie)
router.get('/movie/:id', GetMovieById)
router.get('/movies', GetMovies)

export default router
