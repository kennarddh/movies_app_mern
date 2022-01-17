import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export const InsertMovie = payload => api.post(`/movie`, payload)
export const GetAllMovies = () => api.get(`/movies`)
export const UpdateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const DeleteMovieById = id => api.delete(`/movie/${id}`)
export const GetMovieById = id => api.get(`/movie/${id}`)
