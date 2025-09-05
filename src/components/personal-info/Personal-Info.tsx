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
      let hasNameError = false, hasEmailError = false, hasPhoneNumberError = false;

      if (name.value === '') {
        name.error = 'Name cannot be empty';
        hasNameError = true;
        isValid = false;
      }
      else {
        name.error = '';
        hasNameError = false;
      }

      if (email.value === '') {
        email.error = 'Email cannot be empty';
        hasEmailError = true;
        isValid = false;
      }
      else {
        email.error = '';
        hasEmailError = false;
      }

      if (phoneNumber.value === '') {
        phoneNumber.error = 'Phone number cannot be empty';
        hasPhoneNumberError = true;
        isValid = false;
      }
      else {
        phoneNumber.error = '';
        hasPhoneNumberError = false;
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
    <article>
      <header>
        <h1>Personal Info</h1>
        <p>Please provide your name, email address, and phone number.</p>
      </header>
      <form>
        <div>
          <label htmlFor='name'>Name:<span>*</span></label>
          <input
            type='text'
            required
            value={ name.value }
            onChange={ (event) => dispatch({ type: 'SET_NAME', payload: event.target.value }) }
            />
          <p>{ name.error }</p>
        </div>
        <div>
          <label htmlFor='email'>Email Address:<span>*</span></label>
          <input
            type='email'
            required
            value={ email.value }
            onChange={ (event) => dispatch({ type: 'SET_EMAIL', payload: event.target.value }) }
            />
          <p>{ email.error }</p>
        </div>
        <div>
          <label htmlFor='phone'>Phone Number:<span>*</span></label>
          <input
            type='tel'
            required
            value={ phoneNumber.value }
            onChange={ (event) => dispatch({ type: 'SET_PHONE_NUMBER', payload: event.target.value }) }
          />
          <p>{ phoneNumber.error }</p>
        </div>
      </form>
      <Button validationSettings={{ validate: validator, isValid: isValid, uri: '/select-plan' }}>Next</Button>
    </article>
  );
};