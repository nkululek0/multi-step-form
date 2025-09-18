import styles from './Select-Plan.module.css';

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
  const planElements = {
    ARCADE: useRef<HTMLDivElement>(null),
    ADVANCED: useRef<HTMLDivElement>(null),
    PRO: useRef<HTMLDivElement>(null)
  };

  const nextButtonState: NextButtonState = {
    uri: '/add-ons',
    isValid: false,
    personalInfo: globalContext.personalInfo
  };
  const [nextButton, setNextButton] = useReducer(nextButtonReducer, nextButtonState);
  const { uri, isValid } = nextButton;

  globalContext.planAndBilling = planAndBilling;

  const handleClick = (elementReference: React.RefObject<HTMLDivElement | null>) => {
    const activeClass = 'active';

    planElements.ARCADE.current?.classList.remove(styles[activeClass]);
    planElements.ADVANCED.current?.classList.remove(styles[activeClass]);
    planElements.PRO.current?.classList.remove(styles[activeClass]);

    elementReference.current?.classList.add(styles[activeClass]);
  };

  return (
    <>
    <article className={styles['select-plan-wrapper']}>
      <article className={styles['select-plan']}>
        <header className={styles['header']}>
          <h1>Select your Plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </header>
        <section className={styles['plans-wrapper']}>
          {
            Object.values(plans).map((plan, index) => {
              return (
                <div
                  key={ index }
                  ref={ planElements[plan.type] }
                  onClick={ () => { setPlanAndBilling({ type: 'SET_PLAN', payload: plan.type }); handleClick(planElements[plan.type]); } }
                  className={`${styles['plan']} ${  plan.type === planAndBilling.plan.type ? styles['active'] : '' }`}
                >
                  <img src={ plan.image } alt='arcade image' className='plan-image'/>
                  <div className={styles['plan-details']}>
                    <h4 className={styles['plan-type']}>{ plan.type }</h4>
                    <p className={styles['plan-price']}>
                      { billing === 'YEARLY' ? `$${ plan.price * 10 }/yr` :`$${ plan.price }/mo` }
                    </p>
                    <p className={styles['additional-content']}>
                      { billing === 'YEARLY' ? '2 months free' : '' }
                    </p>
                  </div>
                </div>
              )
            })
          }
        </section>
        <section className={styles['billing']}>
          <p className={styles['billing-text-monthly']}>Monthly</p>
          <label className={styles['switch']}>
            <input
              ref={ billingCheckBox }
              type='checkbox'
              checked={ billing === 'YEARLY' }
              onChange={ () => { setPlanAndBilling({ type: 'SET_BILLING', elementReference: billingCheckBox }) } }
            />
            <span className={styles['slider']}></span>
          </label>
          <p className={styles['billing-text-yearly']}>Yearly</p>
        </section>
      </article>
      <section className={styles['actions']}>
        <Link to='/' className={styles['back-button']}>Go Back</Link>
        <Button validationSettings={ { validate: setNextButton, uri: uri, isValid: isValid } }>Next</Button>
      </section>
    </article>
    </>
  );
};