import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStateValue } from '../../stateProvider.js';
import './Header.scss';

const Header = () => {
	const [{ app, user }, dispatch] = useStateValue();
	return (
		<header className='full'>
			<div className='title'>
				<NavLink
					to='/'
					onClick={() => {
						dispatch({
							type: 'location',
							newLocation: 'home'
						});
					}}
				>
					<h1>STAY STRONG</h1>
				</NavLink>

				{/* <h1>{app.location}</h1> */}
			</div>
			<div className='user-redirect'>
				{user.userName ? (
					<p>
						Hello, <b>{user.userName}</b>{' '}
						<NavLink
							to='/user'
							onClick={() => {
								dispatch({
									type: 'location',
									newLocation: 'user'
								});
							}}
						>
							<i className='fas fa-user-circle' />
						</NavLink>
					</p>
				) : (
					<p />
				)}
			</div>
		</header>
	);
};

export default Header;
