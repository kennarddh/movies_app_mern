import React from 'react'

import styled from 'styled-components'

const MoviesCardContainer = styled.div`
	border: 1px solid #eee;
	border-radius: 15px;
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    box-sizing: border-box;
    width: 400px;
    height: 200px;
`

const MoviesCardTitle = styled.h3`
	margin-bottom: 20px;
`

const MoviesCardText = styled.p`
	margin-bottom: 10px;
`

const MoviesCard = props => {
	return (
		<>
			<MoviesCardContainer>
				<MoviesCardTitle>{props.title}</MoviesCardTitle>
				<MoviesCardText>Time: {props.time.join(', ')}</MoviesCardText>
				<MoviesCardText>Rating: {props.rating}</MoviesCardText>
			</MoviesCardContainer>
		</>
	)
}

export default MoviesCard
