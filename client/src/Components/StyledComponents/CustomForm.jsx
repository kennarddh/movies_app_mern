import React from 'react'

import styled from 'styled-components'

const FormInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
`

const FormButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-top: 20px;
`

const FormButton = styled.button`
	border-radius: 25px;
	padding: 10px 20px;
	border: none;
	background-color: #23b574;
`

const CustomForm = props => {
	const OnSubmit = (event) => {
		event.preventDefault()

		props.onSubmit()
	}

	return (
		<>
			<form onSubmit={OnSubmit}>
				<FormInputWrapper>{props.children}</FormInputWrapper>
				<FormButtonWrapper>
					<FormButton type='submit'>{props.buttonTitle}</FormButton>
				</FormButtonWrapper>
			</form>
		</>
	)
}

export default CustomForm
