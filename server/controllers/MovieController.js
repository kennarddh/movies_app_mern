import Movie from '../models/MovieModel.js'

export const CreateMovie = async (req, res) => {
	const body = req.body

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a movie',
		})
	}

	const movie = new Movie(body)

	if (!movie) {
		return res.status(400).json({ success: false, error: err })
	}

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
	const body = req.body

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		})
	}

	await Movie.findOne({ _id: req.params.id }, async (err, movie) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Movie not found!',
			})
		}

		movie.name = body.name
		movie.time = body.time
		movie.rating = body.rating

		await movie
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
}

export const DeleteMovie = async (req, res) => {
	await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
		if (err) {
			return res.status(400).json({ success: false, error: err })
		}

		if (!movie) {
			return res
				.status(404)
				.json({ success: false, error: `Movie not found` })
		}

		return res.status(200).json({ success: true, data: movie })
	}).catch(err => console.log(err))
}

export const GetMovieById = async (req, res) => {
	await Movie.findOne({ _id: req.params.id }, (err, movie) => {
		if (err) {
			return res.status(400).json({ success: false, error: err })
		}

		if (!movie) {
			return res
				.status(404)
				.json({ success: false, error: `Movie not found` })
		}

		return res.status(200).json({ success: true, data: movie })
	}).catch(err => console.log(err))
}

export const GetMovies = async (req, res) => {
	await Movie.find({}, (err, movies) => {
		if (err) {
			return res.status(400).json({ success: false, error: err })
		}

		if (!movies.length) {
			return res
				.status(404)
				.json({ success: false, error: `Movie not found` })
		}

		return res.status(200).json({ success: true, data: movies })
	}).catch(err => console.log(err))
}
