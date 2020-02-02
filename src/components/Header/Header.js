/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';
import './Header.scss';
import logoSrc from '../../assets/logo-poziom.png';

const Header = () => {
	const [{user,location }, dispatch] = useStateValue();
	console.log(user);
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
					<img src={logoSrc} alt='logo'/>
				</NavLink>
			</div>
			<div className='user-redirect'>
				{user.userName ? (
					<p>
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
