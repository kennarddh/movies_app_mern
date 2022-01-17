import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Component
import Layout from './Components/Layout/Layout'

// Pages
import Movies from './Pages/Movies/Movies'
import UpdateMovies from './Pages/UpdateMovies/UpdateMovies'
import CreateMovies from './Pages/CreateMovies/CreateMovies'

// 404
import NoMatch from './Pages/NoMatch/NoMatch'

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						{/* Movies */}
						<Route path='movies'>
							{/* Index */}
							<Route index element={<Movies />} />

							{/* Create */}
							<Route path='create' element={<CreateMovies />} />

							{/* Edit */}
							<Route path='update/:id' element={<UpdateMovies />} />
						</Route>

						{/* 404 */}
						<Route path='*' element={<NoMatch />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
