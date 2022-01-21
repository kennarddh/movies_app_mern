import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

// Contexts
import AuthConsumer from '../../Contexts/Auth'

const NavbarWrapper = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	right: 0;
	padding: 20px 20px;
	width: 100%;
	background-color: #23b574;
	z-index: 9999;
`

const NavbarItem = styled(Link)`
	text-decoration: none;
	color: black;
	position: relative;
	display: inline-block;
	margin: 0 10px;

	&:after {
		background: none repeat scroll 0 0 transparent;
		bottom: -5px;
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		position: absolute;
		background: #fff;
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: 0;
	}

	&:hover:after {
		width: calc(100% + 20px);
		left: -10px;
	}
`

const NavbarItemButton = styled.button`
	text-decoration: none;
	color: black;
	position: relative;
	display: inline-block;
	margin: 0 10px;
	background-color: transparent;
	border: none;
	font-size: 16px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
		'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
		'Helvetica Neue', sans-serif;
	margin: 0 10;
	padding: 0;

	&:after {
		background: none repeat scroll 0 0 transparent;
		bottom: -5px;
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		position: absolute;
		background: #fff;
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: 0;
	}

	&:hover:after {
		width: calc(100% + 20px);
		left: -10px;
	}
`

const Navbar = () => {
	const { IsLoggedIn, Logout } = AuthConsumer()

	return (
		<>
			<NavbarWrapper>
				{IsLoggedIn ? (
					<>
						{/* Admin */}
						<NavbarItem to='/admin/movies'>Movies</NavbarItem>
						<NavbarItem to='/admin/movies/create'>
							Create movies
						</NavbarItem>
						<NavbarItemButton onClick={Logout}>
							Logout
						</NavbarItemButton>
					</>
				) : (
					<>
						{/* Public */}
						<NavbarItem to='/auth/login'>Login</NavbarItem>
						<NavbarItem to='/auth/register'>Register</NavbarItem>
					</>
				)}
			</NavbarWrapper>
		</>
	)
}

export default Navbar
