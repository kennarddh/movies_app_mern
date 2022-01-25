import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Models
import User from '../Models/User'

export const Register = async (req, res) => {
	const { body } = req

	const user = new User({
		username: body.username.toLowerCase(),
		name: body.name,
		email: body.email.toLowerCase(),
		password: await bcrypt.hash(body.password, 10),
	})

	await user
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: user._id,
				message: 'User created',
			})
		})
		.catch(() => {
			return res.status(500).json({
				success: false,
				error: 'User not created',
			})
		})
}

export const Login = async (req, res) => {
	const { body } = req

	await User.findOne({
		email: body.email,
	})
		.exec()
		.then(user => {
			if (!user) {
				return res.status(400).json({
					success: false,
					error: 'Invalid email or password',
				})
			}

			bcrypt
				.compare(body.password, user.password)
				.then(isPasswordCorrect => {
					if (!isPasswordCorrect) {
						return res.status(400).json({
							success: false,
							error: 'Invalid email or password',
						})
					}

					const payload = {
						id: user._id,
						username: user.username,
					}

					jwt.sign(
						payload,
						process.env.JWT_SECRET,
						{ expiresIn: 86400 },
						(error, token) => {
							if (error)
								return res.status(400).json({
									success: false,
									error: 'Login Failed',
								})

							return res.status(200).json({
								success: true,
								token: `Bearer ${token}`,
							})
						}
					)
				})
		})
}

export const GetUserData = async (req, res) => {
	await User.findById(req.user.id)
		.exec()
		.then(user => {
			return res.status(200).json({
				success: true,
				isLoggedIn: true,
				data: {
					id: user.id,
					username: user.username,
					name: user.name,
					email: user.email,
				},
			})
		})
		.catch(() => {
			return res
				.status(400)
				.json({ success: false, error: 'User Not Found' })
		})
}

export const IsUserLoggedIn = (req, res) => {
	return res.status(200).json({
		success: true,
		isLoggedIn: true,
	})
}
