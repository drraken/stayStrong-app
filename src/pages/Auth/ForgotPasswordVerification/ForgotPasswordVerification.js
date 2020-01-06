import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import FormErrors from '../../../components/Validation/FormErrors.js';
import Validate from '../../../components/Validation/FormValidation.js';

const ForgotPasswordVerification = () => {
    const history = useHistory();
    const defaultState = {
    verificationcode: '',
    email: '',
    newpassword: '',
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

  const passwordVerificationHandler = async event => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, state);
    if (error) {
      setState({
          ...state,
        errors: { ...state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try{
        await Auth.forgotPasswordSubmit(
            state.email,
            state.verificationcode,
            state.newpassword
        );
    history.push('/changepasswordconfirmation');
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
          <h1>Set new password</h1>
          <p>
            Please enter the verification code sent to your email address below,
            your email address and a new password.
          </p>
          <FormErrors formerrors={state.errors} />

          <form onSubmit={passwordVerificationHandler}>
            <div className='field'>
              <p className='control'>
                <input
                  type='text'
                  className='input'
                  id='verificationcode'
                  aria-describedby='verificationCodeHelp'
                  placeholder='Enter verification code'
                  value={state.verificationcode}
                  onChange={onInputChange}
                />
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left'>
                <input 
                  className='input' 
                  type='email'
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
              <p className='control has-icons-left'>
                <input
                  type='password'
                  className='input'
                  id='newpassword'
                  placeholder='New password'
                  value={state.newpassword}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
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

export default ForgotPasswordVerification;