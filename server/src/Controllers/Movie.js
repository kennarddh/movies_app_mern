import { Types } from 'mongoose'

// Utils
import AsyncUnlink from '../Utils/AsyncUnlink'

// Models
import Movie from '../Models/Movie'

export const CreateMovie = async (req, res) => {
	const { body, file } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a movie',
		})
	}

	body.author = req.user.id
	body.image = file.filename

	const movie = new Movie(body)

	await movie
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: movie._id,
				message: 'Movie created!',
			})
		})
		.catch(error => {
			return res.status(400).json({
				success: false,
				error,
				message: 'Movie not created!',
			})
		})
}

export const UpdateMovie = async (req, res) => {
	const { body, file } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		})
	}

	await Movie.findById(req.params.id)
		.exec()
		.then(async movie => {
			if (file) await AsyncUnlink(`uploads/movies/image/${movie.image}`)

			const newMovie = movie

			newMovie.name = body.name
			newMovie.time = body.time
			newMovie.rating = body.rating

			if (file) newMovie.image = file.filename

			await newMovie
				.save()
				.then(() => {
					return res.status(200).json({
						success: true,
						id: movie._id,
						message: 'Movie updated!',
					})
				})
				.catch(error => {
					return res.status(404).json({
						success: false,
						error,
						message: 'Movie not updated!',
					})
				})
		})
		.catch(() => {
			return res.status(400).json({
				success: false,
				error: 'Movie not found!',
			})
		})
}

export const DeleteMovie = async (req, res) => {
	await Movie.findByIdAndDelete({ _id: req.params.id })
		.exec()
		.then(movie => {
			if (!movie) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movie })
		})
		.catch(error => res.status(400).json({ success: false, error }))
}

export const GetMovieById = async (req, res) => {
	await Movie.findById(req.params.id)
		.exec()
		.then(movie => {
			if (!movie) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movie })
		})
		.catch(error => res.status(400).json({ success: false, error }))
}

export const GetMovies = async (req, res) => {
	await Movie.find()
		.exec()
		.then(movies => {
			if (!movies.length) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movies })
		})
		.catch(error => res.status(400).json({ success: false, error }))
}

export const GetMoviesByAuthor = async (req, res) => {
	await Movie.find({ author: req.params.author_id })
		.exec()
		.then(movies => {
			if (!movies.length) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movies })
		})
		.catch(error => res.status(400).json({ success: false, error }))
}
