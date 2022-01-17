import React from 'react'

// component

//styling
import './Title.css'

const Title = props => {
	return (
		<>
			<div className='title'>
				<h1>{props.title}</h1>
			</div>
		</>
	)
}

export default Title
