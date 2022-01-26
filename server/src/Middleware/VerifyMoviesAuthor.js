// Models
import Movie from '../Models/Movie'

const VerifyMoviesAuthor = async (req, res, next) => {
	await Movie.findOne({ _id: req.params.id })
		.exec()
		.then(movie => {
			if (String(movie.author) === String(req.user.id)) {
				next()
			} else {
				return res.status(400).json({
					success: false,
					error: 'User is not the author',
				})
			}
		})
		.catch(() => {
			return res.status(400).json({
				success: false,
				message: 'Movie not found',
			})
		})
}

export default VerifyMoviesAuthor
