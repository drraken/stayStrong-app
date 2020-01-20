/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react';
import './User.scss';
import { Auth,API } from 'aws-amplify';
import { NavLink} from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';
import Loading from '../../components/Loader/Loader';


const User = () => {
	const defaultState={
		kcalGoal: '',
		proteinGoal: '',
		fatGoal: '',
		carbGoal:''
	};

	const [{ user }, dispatch] = useStateValue();
	const[state,setState] = useState(defaultState);
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

	function createParameter(parameter){
		return API.post('usersParameters','/usersParameters',{
			body: parameter
		});
	}
	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		try{
			await createParameter(state);
		} catch(e){
			console.log(e);
			setIsLoading(false);
		}
	}
	const onInputChange = event => {
		setState({
			...state,
			[event.target.id]: event.target.value
		});
	};
	console.log(state);
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
			<div className='user-parameter'>
				<form onSubmit={handleSubmit}>
				
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='kcalGoal'
								aria-describedby='kcalGoalHelp'
								placeholder='kcal'
								value={state.kcalGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='proteinGoal'
								aria-describedby='protienGoalHelp'
								placeholder='protein'
								value={state.proteinGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='fatGoal'
								aria-describedby='fatGoalHelp'
								placeholder='fat'
								value={state.fatGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='carbGoal'
								aria-describedby='carbGoalHelp'
								placeholder='carb'
								value={state.carbGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<button className='button is-success' type='submit' >
								Submit
							</button>
						</p>
					</div>
            	</form>
			</div>
		</div>
	);
};
export default User;
