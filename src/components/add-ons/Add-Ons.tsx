import styles from './Add-Ons.module.css';

import type {
  AddOnTypes,
  AddOnsReducer,
  AddOnsState,
  AddOnsAction,
  AddOnType,
  PlanCheckBoxes,
  NextButtonState,
  NextButtonReducer
} from './Add-Ons.types';

import { Button } from '../button';

import { useGlobalContext } from '../../app/provider';

import { useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';

const addOnsTypes: AddOnTypes = {
  ONLINE_SERVICE: {
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: 1
  },
  LARGER_STORAGE: {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: 2
  },
  CUSTOMISABLE_PROFILE: {
    name: 'Customisable profile',
    description: 'Custom theme on your profile',
    price: 2
  }
};

const addOnsReducer: AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => {
  const { planType, elementReference } = action;
  const isAdded = elementReference.current ? elementReference.current.checked : false;
  const addOnType: AddOnType = planType;

    if (isAdded) {
      if (state.addOnsList.indexOf(addOnsTypes[addOnType]) === -1) {
        state.addOnsList.push(addOnsTypes[addOnType]);
      }
    } else {
      if (state.addOnsList.indexOf(addOnsTypes[addOnType]) !== -1) {
        state.addOnsList.splice(state.addOnsList.indexOf(addOnsTypes[addOnType]), 1);
      }
    }

    return {
      ...state
    };
};

const nextButtonReducer: NextButtonReducer = (state: NextButtonState) => {
  const uri = state.personalInfo.isValid ? '/finishing-up' : '/';

  return {
    ...state,
    uri: uri,
    isValid: true
  };
};

export function AddOns() {

  const globalState = useGlobalContext();
  const addOnsState = globalState.addOns;
  const [, setAddOns] = useReducer(addOnsReducer, addOnsState);
  const billingType = globalState.planAndBilling.billing;

  const planCheckBoxes: PlanCheckBoxes = {
    ONLINE_SERVICE: useRef<HTMLInputElement>(null),
    LARGER_STORAGE: useRef<HTMLInputElement>(null),
    CUSTOMISABLE_PROFILE: useRef<HTMLInputElement>(null)
  };

  const nextButtonState: NextButtonState = {
    uri: '/finishing-up',
    isValid: false,
    personalInfo: globalState.personalInfo
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
            {
              Object.keys(addOnsTypes).map((planType, index) => {
                const element = planCheckBoxes[planType] as React.RefObject<HTMLInputElement | null>;
                const addOn = addOnsTypes[planType as AddOnType];

                return (
                  <div className='add-on' key={ index }>
                    <input type='checkbox'
                      ref={ element }
                      checked={ addOnsState.addOnsList.indexOf(addOn) !== -1 }
                      onChange={ () => { setAddOns({ planType: planType as AddOnType, elementReference: element }) } }
                    />
                    <label>{ addOn.name }</label>
                    <p>{ addOn.description }</p>
                    <p>+${ billingType === 'MONTHLY' ? `${ addOn.price }/mo` : `${ addOn.price * 10 }/yr` }</p>
                  </div>
                );
              })
            }
          </section>
        </section>
        <section className='actions'>
          <Link to='/select-plan'>Go Back</Link>
          <Button validationSettings={ { validate: () => { setNextButton(); }, uri: uri, isValid: isValid } }>Next</Button>
        </section>
      </article>
    </>
  );
};