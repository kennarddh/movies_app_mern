import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

// components
import Title from '../../../Components/StyledComponents/Title'

// utils
import { GetAllMovies, DeleteMovieById } from '../../../Utils/Api'

const MoviesContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`

const MoviesTable = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
	padding: 10px;
`

const MoviesTr = styled.tr`
	border: 1px solid black;
	border-collapse: collapse;
	padding: 10px;
`

const MoviesTd = styled.td`
	border: 1px solid black;
	border-collapse: collapse;
	padding: 10px;
`

const MoviesTh = styled.th`
	border: 1px solid black;
	border-collapse: collapse;
	padding: 10px;
`

const MoviesTdAction = styled(MoviesTd)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	gap: 20px;
	border: none;
`

const MoviesActionButton = styled.button`
	padding: 0 10px;
	border-radius: 15px;
	text-decoration: none;
	min-width: 40px;
	color: black;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 15px;
	height: 40px;
	background-color: ${props => props.backgroundColor};
`

const Movies = () => {
	const Navigate = useNavigate()
	const [Movies, SetMovies] = useState([])

	useEffect(() => {
		let isMounted = true
		const AsyncGetAllMovies = async () => {
			await GetAllMovies()
				.then(response => {
					if (isMounted) SetMovies(response.data.data)
				})
				.catch(err => console.log(err))
		}

		AsyncGetAllMovies()

		return () => {
			isMounted = false
		}
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
			<MoviesContainer>
				<Title title='Movies' />
				<MoviesTable>
					<thead>
						<MoviesTr>
							<MoviesTh>No</MoviesTh>
							<MoviesTh>Name</MoviesTh>
							<MoviesTh>Time</MoviesTh>
							<MoviesTh>Rating</MoviesTh>
							<MoviesTh>Action</MoviesTh>
						</MoviesTr>
					</thead>
					<tbody>
						{Object.keys(Movies).length !== 0 && (
							<>
								{Movies.map((item, index) => (
									<MoviesTr key={item._id}>
										<MoviesTd>{index + 1}</MoviesTd>
										<MoviesTd>{item.name}</MoviesTd>
										<MoviesTd>
											{item.time.join(', ')}
										</MoviesTd>
										<MoviesTd>{item.rating}</MoviesTd>
										<MoviesTdAction>
											<MoviesActionButton
												backgroundColor='green'
												onClick={() =>
													Navigate(
														`update/${item._id}`
													)
												}
											>
												Update
											</MoviesActionButton>
											<MoviesActionButton
												backgroundColor='red'
												onClick={() => Delete(item._id)}
											>
												Delete
											</MoviesActionButton>
										</MoviesTdAction>
									</MoviesTr>
								))}
							</>
						)}
					</tbody>
				</MoviesTable>
			</MoviesContainer>
		</>
	)
}

export default Movies