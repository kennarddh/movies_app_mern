// Models
import Movie from '../Models/Movie'

export const CreateMovie = async (req, res) => {
	const { body } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a movie',
		})
	}

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
				error,
				message: 'Movie not created!',
			})
		})
}

export const UpdateMovie = async (req, res) => {
	const { body } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		})
	}

	await Movie.findOne({ _id: req.params.id })
		.exec()
		.then(async movie => {
			const newMovie = new Movie(body)

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
						error,
						message: 'Movie not updated!',
					})
				})
		})
		.catch(err => {
			return res.status(404).json({
				err,
				message: 'Movie not found!',
			})
		})
}

export const DeleteMovie = async (req, res) => {
	await Movie.findOneAndDelete({ _id: req.params.id })
		.exec()
		.then(movie => {
			if (!movie) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movie })
		})
		.catch(err => res.status(400).json({ success: false, error: err }))
}

export const GetMovieById = async (req, res) => {
	await Movie.findOne({ _id: req.params.id })
		.exec()
		.then(movie => {
			if (!movie) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` })
			}

			return res.status(200).json({ success: true, data: movie })
		})
		.catch(err => res.status(400).json({ success: false, error: err }))
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
		.catch(err => res.status(400).json({ success: false, error: err }))
}
