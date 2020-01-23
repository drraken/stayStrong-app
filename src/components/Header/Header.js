import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';
import './Header.scss';
import logoSrc from '../../assets/logo-poziom.png';

const Header = () => {
	const [{ app, user,location }, dispatch] = useStateValue();
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
				
				{/* <h1>{app.location}</h1> */}
			</div>
			<div className='user-redirect'>
				{user.userName ? (
					<p>
						{/* Hello, <b>{user.userName}</b>{' '} */}
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
