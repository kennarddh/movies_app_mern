import React from 'react'

import styled from 'styled-components'

const TitleDiv = styled.div`
	padding-top: 75px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const TitleH1 = styled.h1`
	font-style: normal;
	font-weight: bold;
`

const Title = props => {
	return (
		<>
			<TitleDiv>
				<TitleH1>{props.title}</TitleH1>
			</TitleDiv>
		</>
	)
}

export default Title
