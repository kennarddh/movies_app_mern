import axios from 'axios'

export const UploadsUrl = 'http://localhost:3000/uploads/'
export const ApiUrl = 'http://localhost:3000/api/'

const api = axios.create({
	baseURL: ApiUrl,
})


export const InsertMovie = (payload, token) =>
	api.post(`/movie`, payload, {
		headers: {
			'x-access-token': token,
		},
	})
export const UpdateMovieById = (id, payload, token) =>
	api.put(`/movie/${id}`, payload, {
		headers: {
			'x-access-token': token,
		},
	})
export const DeleteMovieById = (id, token) =>
	api.delete(`/movie/${id}`, {
		headers: {
			'x-access-token': token,
		},
	})
export const GetAllMovies = () => api.get(`/movies`)
export const GetMovieById = id => api.get(`/movie/${id}`)
export const GetMoviesByAuthor = (authorId) => api.get(`/movies/author/${authorId}`)

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
