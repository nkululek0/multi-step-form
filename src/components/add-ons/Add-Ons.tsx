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
  const [addOns, setAddOns] = useReducer(addOnsReducer, addOnsState);
  const billingType = globalState.planAndBilling.billing;
  const stringifiedAddOns = JSON.stringify(addOns.addOnsList);

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

  globalState.addOns.addOnsList = addOns.addOnsList;

  return (
    <>
      <article className={styles['add-ons-wrapper']}>
        <section className={styles['add-ons']}>
          <header className={styles['header']}>
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience.</p>
          </header>
          <section className={styles['add-ons-options-wrapper']}>
            {
              Object.keys(addOnsTypes).map((planType, index) => {
                const element = planCheckBoxes[planType] as React.RefObject<HTMLInputElement | null>;
                const addOn = addOnsTypes[planType as AddOnType];
                const isChecked = stringifiedAddOns.includes(JSON.stringify(addOn));

                return (
                  <div className={`${styles['add-on-option']} ${isChecked ? styles['active'] : ''}`} key={ index }>
                    <div className={styles['checkbox-content-group']}>
                      <input type='checkbox'
                        ref={ element }
                        checked={ isChecked }
                        onChange={ () => { setAddOns({ planType: planType as AddOnType, elementReference: element }) } }
                      />
                      <div className={styles['add-on-option-content']}>
                        <label>{ addOn.name }</label>
                        <p>{ addOn.description }</p>
                      </div>
                    </div>
                    <p className={styles['add-on-option-price']}>+${ billingType === 'MONTHLY' ? `${ addOn.price }/mo` : `${ addOn.price * 10 }/yr` }</p>
                  </div>
                );
              })
            }
          </section>
        </section>
        <section className={styles['actions']}>
          <Link to='/select-plan' className={styles['back-button']}>Go Back</Link>
          <Button validationSettings={ { validate: () => { setNextButton(); }, uri: uri, isValid: isValid } }>Next Step</Button>
        </section>
      </article>
    </>
  );
};