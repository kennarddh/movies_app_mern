import { body } from 'express-validator'

// Utils
import AsyncUnlink from '../../Utils/AsyncUnlink'

// Middleware
import CheckValidationError from '../../Middleware/CheckValidationError'

const UpdateMovie = () => {
	const ValidateTime = async (req, res, next) => {
		let { time } = req.body

		try {
			time = JSON.parse(time)
		} catch {
			return res
				.status(400)
				.json({ success: false, error: 'Invalid time' })
		}

		if (!time || time.length === 0 || !Array.isArray(time)) {
			await AsyncUnlink(
				`public/uploads/movies/image/${req.file.filename}`
			)

			return res
				.status(400)
				.json({ success: false, error: 'Invalid time' })
		}

		const result = time.every(nowTime =>
			/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(nowTime)
		)

		if (!result) {
			await AsyncUnlink(
				`public/uploads/movies/image/${req.file.filename}`
			)

			return res
				.status(400)
				.json({ success: false, error: 'Invalid time' })
		}

		next()
	}

	const ValidateImage = (req, res, next) => {
		if (!req.body.image)
			if (!req.file) {
				return res
					.status(400)
					.json({ success: false, error: 'Invalid image' })
			}

		next()
	}

	const ValidationError = async req => {
		await AsyncUnlink(`public/uploads/movies/image/${req.file.filename}`)
	}

	const validator = [
		body('name')
			.trim()
			.not()
			.isEmpty()
			.bail()
			.escape()
			.isLength({ max: 100 })
			.bail(),
		body('rating').not().isEmpty().bail().isFloat({ min: 0, max: 10 }),
		ValidateTime,
		ValidateImage,
		CheckValidationError(ValidationError),
	]

	return validator
}

export default UpdateMovie
