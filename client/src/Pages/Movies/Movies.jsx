import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

// components
import Title from '../../Components/Title/Title'

// utils
import { GetAllMovies, DeleteMovieById } from '../../Utils/Api'

// styling
import './Movies.css'

const Movies = () => {
	const Navigate = useNavigate()
	const [Movies, SetMovies] = useState([])

	useEffect(() => {
		const AsyncGetAllMovies = async () => {
			await GetAllMovies()
				.then(response => {
					SetMovies(response.data.data)
				})
				.catch(err => console.log(err))
		}

		AsyncGetAllMovies()
	}, [])

	const Delete = id => {
		const confirm = window.confirm('Are you sure you want to delete')

		if (!confirm) return

		const AsyncDelete = async () => {
			await DeleteMovieById(id)
				.then(async () => {
					await GetAllMovies()
						.then(response => {
							SetMovies(response.data.data)
						})
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		}
		AsyncDelete()
	}

	return (
		<>
			<div className='movies-container'>
				<Title title='Movies' />
				<table className='table'>
					<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Time</th>
							<th>Rating</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(Movies).length !== 0 && (
							<>
								{Movies.map((item, index) => (
									<>
										<tr key={item._id}>
											<td>{index + 1}</td>
											<td>{item.name}</td>
											<td>{item.time.join(', ')}</td>
											<td>{item.rating}</td>
											<td className='action'>
												<button
													onClick={() =>
														Navigate(
															`update/${item._id}`,
															{ replace: true }
														)
													}
													className='button update'
												>
													Update
												</button>
												<button
													onClick={() =>
														Delete(item._id)
													}
													className='button delete'
												>
													Delete
												</button>
											</td>
										</tr>
									</>
								))}
							</>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Movies
