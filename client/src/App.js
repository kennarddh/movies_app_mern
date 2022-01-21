import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Component
import Layout from './Components/Layout/Layout'

// Pages

// Movies
import Movies from './Pages/Movies/Movies'

// Admin Movies
import AdminMovies from './Pages/Admin/Movies/Movies'
import AdminUpdateMovies from './Pages/Admin/UpdateMovies/UpdateMovies'
import AdminCreateMovies from './Pages/Admin/CreateMovies/CreateMovies'

// Auth
import AuthLogin from './Pages/Auth/Login/Login'
import AuthRegister from './Pages/Auth/Register/Register'

// 404
import NoMatch from './Pages/NoMatch/NoMatch'

// Route
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

// Contexts
import { AuthProvider } from './Contexts/Auth'

const App = () => {
	return (
		<>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Layout />}>
							{/* Movies */}
							<Route path='movies' element={<Movies />} />

							{/* Auth */}
							<Route path='auth'>
								{/* Login */}
								<Route path='login' element={<AuthLogin />} />

								{/* Register */}
								<Route
									path='register'
									element={<AuthRegister />}
								/>
							</Route>

							{/* Admin */}
							<Route path='admin' element={<ProtectedRoute />}>
								{/* Movies */}
								<Route path='movies'>
									{/* Index */}
									<Route index element={<AdminMovies />} />

									{/* Create */}
									<Route
										path='create'
										element={<AdminCreateMovies />}
									/>

									{/* Edit */}
									<Route
										path='update/:id'
										element={<AdminUpdateMovies />}
									/>
								</Route>
							</Route>

							{/* 404 */}
							<Route path='*' element={<NoMatch />} />
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</>
	)
}

export default App
