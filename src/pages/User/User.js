/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react';
import './User.scss';
import { Auth,API } from 'aws-amplify';
import { NavLink} from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';
import Loading from '../../components/Loader/Loader';


const User = () => {
	

	const [{ user }, dispatch] = useStateValue();
	
	const [isLoading, setIsLoading] = useState(false);

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
		isLoading ? <Loading/> :
		<div className='user-view'>
			<div className='userprofile'>
				<div className='user-section'>
					<div className='user-icon'>{user.userName.charAt(0).toUpperCase()}</div>
					<div className='user-details'>
						<h2>{`${user.userName}`}</h2>
					</div>
					
				</div>
			</div>
			<ul className='button-redirect'>
				<li className='top-button'>
					<button type='button' onClick={handleLogOut}>
							Log out
					</button>
				</li>
				<li className='top-button'>
					<NavLink
						to='/changepassword'
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'changepassword'
							});
						}}
					>
					Change password	
					</NavLink>
				</li>
				<li className='top-button'>
					<NavLink
						to='/addEditParameters'
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'addparameter'
							});
						}}
					>
					Add/Edit makro goals	
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
export default User;
