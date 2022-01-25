import { body } from 'express-validator'

// Middleware
import CheckValidationError from '../../Middleware/CheckValidationError'

// Models
import User from '../../Models/User'

const Register = () => {
	const validator = [
		body('username')
			.trim()
			.not()
			.isEmpty()
			.escape()
			.isLength({ max: 32 })
			.custom(async value => {
				await User.findOne({ username: value })
					.exec()
					.then(user => {
						if (user) {
							throw new Error(
								'Username or email has already taken'
							)
						}
					})
			}),
		body('name').trim().not().isEmpty().escape().isLength({ max: 32 }),
		body('email')
			.trim()
			.not()
			.isEmpty()
			.escape()
			.isEmail()
			.normalizeEmail({ all_lowercase: true })
			.custom(async value => {
				await User.findOne({ email: value })
					.exec()
					.then(user => {
						if (user) {
							throw new Error(
								'Username or email has already taken'
							)
						}
					})
			}),
		body('password')
			.trim()
			.not()
			.isEmpty()
			.isString()
			.custom(value => {
				if (/\s/g.test(value)) {
					throw new Error('Password cannot have whitespace')
				} else {
					return true
				}
			})
			.isLength({ min: 8, max: 32 }),
		CheckValidationError,
	]

	return validator
}

export default Register
