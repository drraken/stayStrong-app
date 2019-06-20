import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStateValue } from '../../stateProvider.js';
import './Header.scss';

const Header = () => {
	const [{ app, user }, dispatch] = useStateValue();
	return (
		<header className="full">
			<div className="title">
				<h1>{app.location}</h1>
			</div>
			<div className="user-redirect">
				<p>
					Hello, <b>{user.firstName}</b>{' '}
				</p>
				<NavLink
					to="/user"
					onClick={() => {
						dispatch({
							type: 'location',
							newLocation: 'user',
						});
					}}
				>
					<i className="fas fa-user-circle" />
				</NavLink>
			</div>
		</header>
	);
};

export default Header;
