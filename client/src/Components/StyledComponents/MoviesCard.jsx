import React from 'react'

import styled from 'styled-components'

// Utils
import { UploadsUrl } from 'Utils/Api'

const MoviesCardContainer = styled.div`
	border: 1px solid #eee;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const MoviesCardBody = styled.div`
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 400px;
	height: 200px;
`

const MoviesCardImage = styled.img`
	width: 250px;
	height: 250px;
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
				<MoviesCardImage
					src={`${UploadsUrl}movies/image/${props.image}`}
				/>
				<MoviesCardBody>
					<MoviesCardTitle>{props.title}</MoviesCardTitle>
					<MoviesCardText>
						Time: {props.time.join(', ')}
					</MoviesCardText>
					<MoviesCardText>Rating: {props.rating}</MoviesCardText>
				</MoviesCardBody>
			</MoviesCardContainer>
		</>
	)
}

export default MoviesCard
