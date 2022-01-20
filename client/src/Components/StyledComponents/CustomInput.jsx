import React from 'react'

import styled from 'styled-components'

const CustomInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
`

const CustomInputInput = styled.input`
	border-radius: 25px;
	border: 1px solid rgb(128, 128, 128, 0.5);
	padding: 5px 10px;
	text-align: center;
`

const CustomInput = ({ value, onChange, type, id, label, ...inputProps }) => {
	return (
		<>
			<CustomInputContainer>
				<label className='custom-input-label' htmlFor={id}>
					{label}
				</label>
				<CustomInputInput
					id={id}
					value={value}
					onChange={event => onChange(event.target.value)}
					type={type}
					{...inputProps}
				/>
			</CustomInputContainer>
		</>
	)
}

export default CustomInput
