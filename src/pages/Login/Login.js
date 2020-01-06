import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory, NavLink } from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';

const Login = () => {
	// const history = useHistory();
	const [{ user }, dispatch] = useStateValue();
	const defaultState = {
		username: '',
		password: '',
		errors: {
			cognito: null,
			blankfield: false
		}
	};

	const [state, setState] = useState(defaultState);

	const handleSubmit = async event => {
		event.preventDefault();

		// AWS Cognito integration here

		try {
			const loggedUser = await Auth.signIn(
				state.username,
				state.password
			);
			console.log(loggedUser);
			// redirect
			dispatch({
				type: 'authentication-user',
				isAuthenticated: true,
				userName: loggedUser.username
			});
			console.log(loggedUser.username);
			dispatch({
				type: 'location',
				newLocation: 'home'
			});
			// history.push('/');
			console.log(user);
		} catch (error) {
			let err = null;
			// eslint-disable-next-line no-unused-expressions
			!error.message ? (err = { message: error }) : (err = error);
			setState({
				errors: {
					...state.errors,
					cognito: error
				}
			});
		}
	};

	const onInputChange = event => {
		setState({
			...state,
			[event.target.id]: event.target.value
		});
		// document.getElementById(event.target.id).classList.remove('is-danger');
	};
	return (
		<section className='section auth'>
			<div className='container'>
				<h1>Log in</h1>

				<form onSubmit={handleSubmit}>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='username'
								aria-describedby='usernameHelp'
								placeholder='Enter username or email'
								value={state.username}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control has-icons-left'>
							<input
								className='input'
								type='password'
								id='password'
								placeholder='Password'
								value={state.password}
								onChange={onInputChange}
							/>
							<span className='icon is-small is-left'>
								<i className='fas fa-lock' />
							</span>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<a href='/forgotpassword'>Forgot password?</a>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<NavLink
								to='/register'
								onClick={() => {
									dispatch({
										type: 'location',
										newLocation: 'register'
									});
								}}
							>
								<span>No account yet? Click here.</span>
							</NavLink>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<button className='button is-success' type='submit'>
								Login
							</button>
						</p>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;
