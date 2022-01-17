import React from 'react'

// component
import Navbar from '../../Components/Navbar/Navbar'

//styling
import './NoMatch.css'

const NoMatch = () => {
	return (
		<>
			<Navbar />
			<div className='no-match'>
				<div className='body'>
					<h1>404</h1>
					<p>This page could not be found.</p>
				</div>
			</div>
		</>
	)
}

export default NoMatch
