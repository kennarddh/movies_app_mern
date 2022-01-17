import React from 'react'

// components

// styling
import './CustomInput.css'

const CustomInput = ({ value, onChange, type, id, label, ...inputProps }) => {
	return (
		<>
			<div className='custom-input-container'>
				<label className='custom-input-label' htmlFor={id}>
					{label}
				</label>
				<input
					id={id}
					value={value}
					className='custom-input'
					onChange={event => onChange(event.target.value)}
					type={type}
					{...inputProps}
				/>
			</div>
		</>
	)
}

export default CustomInput
