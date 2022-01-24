import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

// Components
import Title from 'Components/StyledComponents/Title'
import MoviesCard from 'Components/StyledComponents/MoviesCard'

// Utils
import { GetAllMovies } from 'Utils/Api'

const MoviesContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const CardContainer = styled.div`
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
`

const Movies = () => {
	const [Movies, SetMovies] = useState([])

	useEffect(() => {
		let isMounted = true

		const AsyncGetMovies = async () => {
			await GetAllMovies()
				.then(response => response.data)
				.then(data => data.data)
				.then(movies => {
					if (isMounted) SetMovies(movies)
				})
		}

		AsyncGetMovies()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<>
			<MoviesContainer>
				<Title title='Movies' />
				<CardContainer>
					{Movies.map(movie => (
						<>
							<MoviesCard
								key={movie._id}
								title={movie.name}
								time={movie.time}
								rating={movie.rating}
								image={movie.image}
							/>
						</>
					))}
				</CardContainer>
			</MoviesContainer>
		</>
	)
}

export default Movies
