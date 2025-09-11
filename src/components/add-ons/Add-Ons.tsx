import type { AddOnsState, AddOnsReducer, AddOnsAction, NextButtonState, NextButtonReducer } from './Add-Ons.types';

import { Button } from '../button';

import { useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';

const addOnsReducer: AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => {
  const { type, elementReference } = action;

  switch (type) {
    case 'ONLINE_SERVICE':
      return {
        ...state,
        onlineService: elementReference.current ? elementReference.current.checked : false
      };
    case 'LARGER_STORAGE':
      return {
        ...state,
        largerStorage: elementReference.current ? elementReference.current.checked : false
      };
    case 'CUSTOMIZABLE_PROFILE':
      return {
        ...state,
        customizableProfile: elementReference.current ? elementReference.current.checked : false
      };
    default:
      return state;
  }
};

const nextButtonReducer: NextButtonReducer = (state: NextButtonState) => {
  // Content in here should check if personal information exists
  // And if not, redirect to personal info page
  // Else navigate to next page
  // Both conditions should manipulate the uri
  return {
    ...state,
    isValid: true
  };
};

export function AddOns() {

  const addOnsState: AddOnsState = {
    billingType: 'MONTHLY',
    onlineService: false,
    largerStorage: false,
    customizableProfile: false
  };
  const [addOns, setAddOns] = useReducer(addOnsReducer, addOnsState);
  const { billingType } = addOns;

  const onlineServiceCheckbox = useRef<HTMLInputElement>(null);
  const largerStorageCheckbox = useRef<HTMLInputElement>(null);
  const customizableProfileCheckbox = useRef<HTMLInputElement>(null);

  const nextButtonState: NextButtonState = {
    uri: '/summary',
    isValid: false
  };
  const [nextButton, setNextButton] = useReducer(nextButtonReducer, nextButtonState);
  const { uri, isValid } = nextButton;

  return (
    <>
      <article>
        <section className='content'>
          <header>
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience.</p>
          </header>
          <section className='add-ons'>
            <div className='add-on'>
              <input
                type='checkbox'
                id='online-service'
                name='online-service'
                ref={ onlineServiceCheckbox }
                onChange={ () => { setAddOns({ type: 'ONLINE_SERVICE', elementReference: onlineServiceCheckbox }) } }
              />
              <label htmlFor='online-service'>Online service</label>
              <p>Access to multiplayer games</p>
              <p>+${ billingType === 'MONTHLY' ? '1/mo': '10/yr' }</p>
            </div>
            <div className='add-on'>
              <input
                type='checkbox'
                id='larger-storage'
                name='larger-storage'
                ref={ largerStorageCheckbox }
                onChange={ () => { setAddOns({ type: 'LARGER_STORAGE', elementReference: largerStorageCheckbox }) } }
              />
              <label htmlFor='larger-storage'>Larger storage</label>
              <p>Extra 1TB of cloud save</p>
              <p>+${ billingType === 'MONTHLY' ? '2/mo': '20/yr' }</p>
            </div>
            <div className='add-on'>
              <input
                type='checkbox'
                id='customizable-profile'
                name='customizable-profile'
                ref={ customizableProfileCheckbox }
                onChange={ () => { setAddOns({ type: 'CUSTOMIZABLE_PROFILE', elementReference: customizableProfileCheckbox }) } }
              />
              <label htmlFor='customizable-profile'>Customizable profile</label>
              <p>Custom theme on your profile</p>
              <p>+${ billingType === 'MONTHLY' ? '2/mo': '20/yr' }</p>
            </div>
          </section>
        </section>
        <section className='actions'>
          <Link to='/select-plan'>go back</Link>
          <Button validationSettings={ { validate: () => { setNextButton(); }, uri: uri, isValid: isValid } }>Next</Button>
        </section>
      </article>
    </>
  );
};