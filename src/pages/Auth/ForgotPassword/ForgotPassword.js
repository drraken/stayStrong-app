import React, { useState } from 'react';
import { NavLink,useHistory} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import FormErrors from '../../../components/Validation/FormErrors.js';
import Validate from '../../../components/Validation/FormValidation.js';
import { useStateValue } from '../../../stateProvider.js';
import './ForgotPassword.scss';

const ForgotPassword = ()=> {
  const history = useHistory();
  const [{user},dispatch] = useStateValue();
  const defaultState= {
    email: '',
    errors: {
      cognito: null,
      blankfield: false
    }
  }
  const [state, setState] = useState(defaultState);
  const clearErrorState = () => {
    setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  const forgotPasswordHandler = async event => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, state);
    if (error) {
      setState({
        errors: { ...state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try{
        await Auth.forgotPassword(state.email);
        history.push('/forgotpasswordverification');
    }catch(error){
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
  }

  const onInputChange = event => {
    setState({
       ...state,
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove('is-danger');
  }
    return (
      <section className='section auth'>
        <div className='container'>
          <h1>Forgot your password?</h1>
          <p className="info">
            Please enter the email address associated with your account and we'll
            email you a password reset link.
          </p>
          <FormErrors formerrors={state.errors} />

          <form onSubmit={forgotPasswordHandler}>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  type='email'
                  className='input'
                  id='email'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                  value={state.email}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope'></i>
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
                        <span>Log in here.</span>
                    </NavLink>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-success' type='submit'>
                  Submit
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
}


export default ForgotPassword;