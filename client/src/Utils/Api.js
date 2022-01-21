import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export const InsertMovie = payload => api.post(`/movie`, payload)
export const GetAllMovies = () => api.get(`/movies`)
export const UpdateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const DeleteMovieById = id => api.delete(`/movie/${id}`)
export const GetMovieById = id => api.get(`/movie/${id}`)

export const AuthLogin = payload => api.post(`/auth/login`, payload)
export const AuthRegister = payload => api.post(`/auth/register`, payload)
export const AuthUserData = token =>
	api.get(`/auth/user`, {
		headers: {
			'x-access-token': token,
		},
	})
export const AuthCheckLoggedIn = token =>
	api.get(`/auth/check_logged_in`, {
		headers: {
			'x-access-token': token,
		},
	})
