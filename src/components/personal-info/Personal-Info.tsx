import styles from './Personal-Info.module.css';

import { Button } from '../button';
import type { PersonalInfoState, PersonalInfoAction, PersonalInfoReducer } from './Personal-Info.types';

import { useGlobalContext } from '../../app/provider';

import { useReducer, useRef } from 'react';

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

  const globalState = useGlobalContext();
  const personalInfoState: PersonalInfoState = globalState.personalInfo;
  const [personalInfo, dispatch] = useReducer(reducer, personalInfoState);
  const { name, email, phoneNumber, isValid } = personalInfo;
  const calledValidator = useRef(false);
  const validator = () => {
    dispatch({ type: 'VALIDATE' });
    calledValidator.current = true;
  };

  globalState.personalInfo = personalInfo;
  globalState.personalInfo.isValid = calledValidator.current ? isValid : false;

  return (
    <>
      <article className='personal-info-wrapper'>
        <section className={styles['personal-info']}>
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
                placeholder='e.g. Stephen King'
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
                placeholder='e.g. stephenking@lorem.com'
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
                placeholder='e.g. +27 72 123 4567'
                onChange={ (event) => dispatch({ type: 'SET_PHONE_NUMBER', payload: event.target.value }) }
                className={styles['input']}
              />
            </div>
          </form>
        </section>
        <section className={styles['actions']}>
          <Button validationSettings={{ validate: validator, isValid: isValid, uri: '/select-plan' }}>Next</Button>
        </section>
      </article>
    </>
  );
};