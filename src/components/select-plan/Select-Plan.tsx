import ArcadeImage from '../../assets/images/icon-arcade.svg';
import AdvancedImage from '../../assets/images/icon-advanced.svg';
import ProImage from '../../assets/images/icon-pro.svg';

import type {
  Plans,
  PlanAndBillingReducer,
  PlanAndBillingState,
  PlanAndBillingAction,
  NextButtonState,
  NextButtonReducer
} from './Select-Plan.types';

import { Button } from '../button';

import { useGlobalContext } from '../../app/provider';

import { Link } from 'react-router-dom';
import { useReducer, useRef } from 'react';

// Define all types of plans
const plans: Plans = {
  'ARCADE': {
    type: 'ARCADE',
    price: 9,
    image: ArcadeImage
  },
  'ADVANCED': {
    type: 'ADVANCED',
    price: 12,
    image: AdvancedImage
  },
  'PRO': {
    type: 'PRO',
    price: 15,
    image: ProImage
  }
};

const planAndBillingReducer: PlanAndBillingReducer = (state: PlanAndBillingState, action: PlanAndBillingAction) => {
  const { type } = action;

  switch (type) {
    case 'SET_PLAN':
      const { image, ...planWithoutImage } = plans[action.payload];

      return {
        ...state,
        plan: planWithoutImage
      };
    case 'SET_BILLING':
      const billing = action.elementReference.current ? action.elementReference.current.checked : false;
      const billingType = billing ? 'YEARLY' : 'MONTHLY';

      return {
        ...state,
        billing: billingType
      };
    default:
      return state;
  }
};

const nextButtonReducer: NextButtonReducer = (state: NextButtonState) => {
  const uri = state.personalInfo.isValid ? '/add-ons' : '/';

  return {
    ...state,
    uri: uri,
    isValid: true
  };
};

export function SelectPlan() {

  const globalContext = useGlobalContext();
  const planAndBillingState = globalContext.planAndBilling;
  const [planAndBilling, setPlanAndBilling] = useReducer(planAndBillingReducer, planAndBillingState);
  const { billing } = planAndBilling;

  const billingCheckBox = useRef<HTMLInputElement>(null);

  const nextButtonState: NextButtonState = {
    uri: '/add-ons',
    isValid: false,
    personalInfo: globalContext.personalInfo
  };
  const [nextButton, setNextButton] = useReducer(nextButtonReducer, nextButtonState);
  const { uri, isValid } = nextButton;

  globalContext.planAndBilling = planAndBilling;

  return (
    <>
      <article>
        <header>
          <h1>Select your Plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </header>
        <section className='plan'>
          {
            Object.values(plans).map((plan, index) => {
              return (
                <div key={ index } onClick={ () => { setPlanAndBilling({ type: 'SET_PLAN', payload: plan.type }) } }>
                  <img src={ plan.image } alt='arcade image' />
                  <h4>{ plan.type }</h4>
                  <p>
                    { billing === 'YEARLY' ? `$${ plan.price * 10 }/yr` :`$${ plan.price }/mo` }
                  </p>
                  <p className='additional-content'>
                    { billing === 'YEARLY' ? '2 months free' : '' }
                  </p>
                </div>
              )
            })
          }
        </section>
        <section className='billing'>
          <p>Monthly</p>
          <label className='switch'>
            <input
              ref={ billingCheckBox }
              type='checkbox'
              onChange={ () => { setPlanAndBilling({ type: 'SET_BILLING', elementReference: billingCheckBox }) } }
            />
            <span className='slider round'></span>
          </label>
          <p>Yearly</p>
        </section>
      </article>
      <section className='actions'>
        <Link to='/'>Go Back</Link>
        <Button validationSettings={ { validate: setNextButton, uri: uri, isValid: isValid } }>Next</Button>
      </section>
    </>
  );
};