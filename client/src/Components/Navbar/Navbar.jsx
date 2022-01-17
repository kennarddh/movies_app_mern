import React from 'react'

import { Link } from 'react-router-dom'

// component

// styling
import './Navbar.css'

const Navbar = () => {
	return (
		<>
			<nav className='navbar'>
				<div className='center'>
					<Link to='/movies' className='item'>
						Movies
					</Link>
					<Link to='/movies/create' className='item'>
						Create movies
					</Link>
				</div>
			</nav>
		</>
	)
}

export default Navbar
