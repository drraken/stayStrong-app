/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './User.scss';
import { Auth } from 'aws-amplify';
import { NavLink} from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';


const User = () => {
	const [{ user }, dispatch] = useStateValue();

	const handleLogOut = async event => {
		event.preventDefault();
		try {
			Auth.signOut();
			dispatch({
				type: 'authentication-user',
				isAuthenticated: false,
				userName: ''
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='user-view'>
			<div className='userprofile'>
				<div className='user-section'>
					<div className='user-icon'>{user.userName.slice(0, 1)}</div>
					<div className='user-details'>
						<h2>{`${user.userName}`}</h2>
					</div>
					<button type='button' onClick={handleLogOut}>
						Log out
					</button>
					<NavLink
						to='/changepassword'
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'changepassword'
							});
						}}
					>
						<span>
							Change Password
						</span>
					</NavLink>
				</div>
			</div>
		</div>
	);
};
export default User;
