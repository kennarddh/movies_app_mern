import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Models
import User from '../Models/User'

export const Register = async (req, res) => {
	const { body } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a user',
		})
	}

	const takenUsername = await User.findOne({
		username: body.username.toLowerCase(),
	})

	const takenEmail = await User.findOne({
		email: body.email.toLowerCase(),
	})

	if (takenUsername || takenEmail) {
		return res.status(400).json({
			success: false,
			error: 'Username or email has already taken',
		})
	}

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
				message: 'User created!',
			})
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'User not created!',
			})
		})
}

export const Login = async (req, res) => {
	const { body } = req

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a user',
		})
	}

	await User.findOne({
		email: body.email.toLowerCase(),
	})
		.exec()
		.then(user => {
			if (!user) {
				return res.status(400).json({
					success: false,
					error: 'Invalid username or password',
				})
			}

			bcrypt
				.compare(body.password, user.password)
				.then(isPasswordCorrect => {
					if (!isPasswordCorrect) {
						return res.status(400).json({
							success: false,
							error: 'Invalid username or password',
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
								return res
									.status(400)
									.json({ success: false, error })

							return res.status(200).json({
								success: true,
								token: `Bearer ${token}`,
							})
						}
					)
				})
		})
}

export const GetUserData = (req, res) => {
	return res.status(200).json({
		success: true,
		isLoggedIn: true,
		data: {
			username: req.user.username,
			name: req.user.name,
			email: req.user.email,
		},
	})
}

export const IsUserLoggedIn = (req, res) => {
	return res.status(200).json({
		success: true,
		isLoggedIn: true,
	})
}
