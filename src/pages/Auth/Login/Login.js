import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory, NavLink } from 'react-router-dom';
import { useStateValue } from '../../../stateProvider.js';
import FormErrors from '../../../components/Validation/FormErrors.js';
import Validate from '../../../components/Validation/FormValidation.js';

const Login = () => {
	const history = useHistory();
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

	const clearErrorState = () => {
		setState({
		  ...state,
		  errors: {
			cognito: null,
			blankfield: false
		  }
		});
	  };

	const handleSubmit = async event => {
		event.preventDefault();

		clearErrorState();
		const error = Validate(event, state);
		if (error) {
		  setState({
			...state,
			errors: { ...state.errors, ...error }
		  });
		}

		try {
			const loggedUser = await Auth.signIn(
				state.username,
				state.password
			);
			dispatch({
				type: 'authentication-user',
				isAuthenticated: true,
				userName: loggedUser.username
			});
			dispatch({
				type: 'location',
				newLocation: 'home'
			});
			history.push('/');
		} catch (error) {
			let err = null;
			// eslint-disable-next-line no-unused-expressions
			!error.message ? (err = { message: error }) : (err = error);
			setState({
				...state,
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
		document.getElementById(event.target.id).classList.remove('is-danger');
	};
	return (
		<section className='section auth'>
			<div className='container'>
				<h1>Log in</h1>
				<FormErrors formerrors={state.errors} />
				
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
						<NavLink
								to='/forgotpassword'
								onClick={() => {
									dispatch({
										type: 'location',
										newLocation: 'forgotpassword'
									});
								}}
							>
								<span>Forgot password? Click here.</span>
							</NavLink>
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