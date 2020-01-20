import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import FormErrors from '../../../components/Validation/FormErrors.js';
import Validate from '../../../components/Validation/FormValidation.js';
import './ChangePassword.scss';

const ChangePassword = ()=> {
  const history = useHistory();
  const defaultState = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }
  const [state, setState] = useState(defaultState);
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

    try {
        const user = await Auth.currentAuthenticatedUser()
        await Auth.changePassword(
            user,
            state.oldpassword,
            state.newpassword
        );
        history.push('/changepasswordconfirm');
        
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
  }

    return (
      <section className='section auth'>
        <div className='container'>
          <h1>Change Password</h1>
          <FormErrors formerrors={state.errors} />

          <form onSubmit={handleSubmit}>
            <div className='field'>
              <p className='control has-icons-left'>
                <input 
                  className='input' 
                  type='password'
                  id='oldpassword'
                  placeholder='Old password'
                  value={state.oldpassword}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock icon'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  type='password'
                  id='newpassword'
                  placeholder='New password'
                  value={state.newpassword}
                  onChange={onInputChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock icon'></i>
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
                  <i className='fas fa-lock icon'></i>
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

export default ChangePassword;