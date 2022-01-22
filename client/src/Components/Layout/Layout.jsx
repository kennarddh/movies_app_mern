import React from 'react'

import { Outlet } from 'react-router-dom'

// components
import Navbar from 'Components/StyledComponents/Navbar'

const Layout = () => {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default Layout
