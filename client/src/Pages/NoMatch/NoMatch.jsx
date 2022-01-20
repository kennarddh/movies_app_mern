import React from 'react'

import styled from 'styled-components'

const NoMatchContainer = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`

const NoMatchBody = styled.div`
	width: 450px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const NoMatchH1 = styled.h1`
	border-right: 1px solid black;
	display: inline-block;
	padding: 10px 30px;
	color: black;
`
const NoMatchP = styled.p`
	display: inline-block;
	padding: 10px 30px;
	color: black;
`

const NoMatch = () => {
	return (
		<>
			<NoMatchContainer>
				<NoMatchBody>
					<NoMatchH1>404</NoMatchH1>
					<NoMatchP>This page could not be found.</NoMatchP>
				</NoMatchBody>
			</NoMatchContainer>
		</>
	)
}

export default NoMatch
