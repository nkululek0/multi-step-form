import styles from './Personal-Info.module.css';
import { Button } from '../button';
import type { PersonalInfoState, PersonalInfoAction, PersonalInfoReducer } from './Personal-Info.types';
import { useReducer } from 'react';

const reducer: PersonalInfoReducer = (state: PersonalInfoState, action: PersonalInfoAction) => {
  const { type } = action;
  let { name, email, phoneNumber, isValid } = state;

  switch (type) {
    case 'SET_NAME':
      return {
        ...state,
        name: { value: action.payload, error: name.error }
    };
    case 'SET_EMAIL':
      return {
        ...state,
        email: { value: action.payload, error: email.error }
      };
    case 'SET_PHONE_NUMBER':
      return {
        ...state,
        phoneNumber: { value: action.payload, error: phoneNumber.error }
      };
    case 'VALIDATE':
      isValid = true;
      let hasNameError = false;
      let hasEmailError = false;
      let hasPhoneNumberError = false;

      if (name.value === '') {
        name.error = 'This field is required';
        hasNameError = true;
        isValid = false;
      }
      else {
        name.error = '';
      }

      if (email.value === '') {
        email.error = 'This field is required';
        hasEmailError = true;
        isValid = false;
      }
      else {
        email.error = '';
      }

      if (phoneNumber.value === '') {
        phoneNumber.error = 'This field is required';
        hasPhoneNumberError = true;
        isValid = false;
      }
      else {
        phoneNumber.error = '';
      }

      return {
        ...state,
        isValid: isValid
      };
    default:
      return state;
  }
};

export function PersonalInfo() {

  const defaultState: PersonalInfoState = {
    name: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    phoneNumber: {
      value: '',
      error: '',
    },
    isValid: false
  };
  const [personalInfo, dispatch] = useReducer(reducer, defaultState);
  const { name, email, phoneNumber, isValid } = personalInfo;
  const validator = () => {
    dispatch({ type: 'VALIDATE' });
  };

  return (
    <>
      <article className={styles['personal-info']}>
        <header className={styles['header']}>
          <h1>Personal Info</h1>
          <p>Please provide your name, email address, and phone number.</p>
        </header>
        <form className={styles['form']}>
          <div className={styles['input-wrapper']}>
            <div className={styles['label-wrapper']}>
              <label htmlFor='name'>Name</label>
              <span className={styles['error']}>{ name.error }</span>
            </div>
            <input
              type='text'
              required
              value={ name.value }
              onChange={ (event) => dispatch({ type: 'SET_NAME', payload: event.target.value }) }
              className={styles['input']}
            />
          </div>
          <div className={styles['input-wrapper']}>
            <div className={styles['label-wrapper']}>
              <label htmlFor='email'>Email Address</label>
              <span className={styles['error']}>{ email.error }</span>
            </div>
            <input
              type='email'
              required
              value={ email.value }
              onChange={ (event) => dispatch({ type: 'SET_EMAIL', payload: event.target.value }) }
              className={styles['input']}
            />
          </div>
          <div className={styles['input-wrapper']}>
            <div className={styles['label-wrapper']}>
              <label htmlFor='phone'>Phone Number</label>
              <span className={styles['error']}>{ phoneNumber.error }</span>
            </div>
            <input
              type='tel'
              required
              value={ phoneNumber.value }
              onChange={ (event) => dispatch({ type: 'SET_PHONE_NUMBER', payload: event.target.value }) }
              className={styles['input']}
            />
          </div>
        </form>
      </article>
      <Button validationSettings={{ validate: validator, isValid: isValid, uri: '/select-plan' }}>Next</Button>
    </>
  );
};