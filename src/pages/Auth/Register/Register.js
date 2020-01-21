/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import './Register.scss';
import { Auth } from 'aws-amplify';
import { NavLink,useHistory } from 'react-router-dom';
import { useStateValue } from '../../../stateProvider.js';
import FormErrors from '../../../components/Validation/FormErrors.js';
import Validate from '../../../components/Validation/FormValidation.js';


const Register = () => {
	const history = useHistory();
	const [{user},dispatch] = useStateValue();
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
	console.log(state);
	const clearErrorState = () => {
		setState({
		  ...state,
		  errors: {
			cognito: null,
			blankfield: false,
			passwordmatch: false
		  }
		});
	  }

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
			history.push('/welcome');
			
		} catch (error) {
			let err = null;
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
		console.log(state);
		document.getElementById(event.target.id).classList.remove('is-danger');
	};

	return (
		<section className='section auth'>
			<div className='container'>
				<h1>Register</h1>
				<FormErrors formerrors={state.errors} />

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
							<span className='icon is-small is-left'>
								<i className='fas fa-lock icon' />
							</span>
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
							<span className='icon is-small is-left'>
								<i className='fas fa-lock icon' />
							</span>
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
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Register;
