/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import './Register.scss';
import { Auth } from 'aws-amplify';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';

const Register = () => {
	const [dispatch] = useStateValue();
	const defaultState = {
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
		errors: {
			cognito: null,
			blankfield: false,
			passwordmatch: false
		}
	};
	const [state, setState] = useState(defaultState);

	const handleSubmit = async event => {
		event.preventDefault();

		// AWS Cognito integration here
		const { username, email, password } = state;
		try {
			const signUpResponse = await Auth.signUp({
				username,
				password,
				attributes: {
					// eslint-disable-next-line object-shorthand
					email: email
				}
			});
			console.log(signUpResponse);
			// redirect
		} catch (error) {
			let err = null;
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
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='username'
								aria-describedby='userNameHelp'
								placeholder='Enter username'
								value={state.username}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control has-icons-left has-icons-right'>
							<input
								className='input'
								type='email'
								id='email'
								aria-describedby='emailHelp'
								placeholder='Enter email'
								value={state.email}
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
						</p>
					</div>
					<div className='field'>
						<p className='control has-icons-left'>
							<input
								className='input'
								type='password'
								id='confirmpassword'
								placeholder='Confirm password'
								value={state.confirmpassword}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<NavLink
								to='/login'
								onClick={() => {
									dispatch({
										type: 'location',
										newLocation: 'login'
									});
								}}
							>
								<span>
									Have an account already? Click here.
								</span>
							</NavLink>
						</p>
					</div>
					<div className='field'>
						<button className='button is-success' type='submit'>
							Register
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Register;
