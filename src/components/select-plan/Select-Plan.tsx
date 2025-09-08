import ArcadeImage from '../../assets/images/icon-arcade.svg';
import AdvancedImage from '../../assets/images/icon-advanced.svg';
import ProImage from '../../assets/images/icon-pro.svg';

import type { PlanAndBillingReducer, PlanAndBillingState, PlanAndBillingAction } from './Select-Plan.types';

import { Link } from 'react-router-dom';

import { useReducer } from 'react';

const reducer: PlanAndBillingReducer = (state: PlanAndBillingState, action: PlanAndBillingAction) => {
  const { type } = action;
  switch (type) {
    case 'SET_PLAN':
      return {
        ...state,
        plan: { type: action.payload.type, price: action.payload.price }
      };
    case 'SET_BILLING':
      return {
        ...state,
        billing: action.payload
      };
    default:
      return state;
  }
};

export function SelectPlan() {

  const defaultState: PlanAndBillingState = {
    plan: { type: 'ARCADE', price: 9 },
    billing: 'MONTHLY'
  };

  const [planAndBilling, dispatch] = useReducer(reducer, defaultState);
  const { plan, billing } = planAndBilling;

  // Acts as a way to show that the state has been updated (should end up on global state)
  defaultState.plan = { type: plan.type, price: plan.price };
  defaultState.billing = billing;

  return (
    <>
      <article>
        <header>
          <h1>Select your Plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </header>
        <section className='plan'>
          <div onClick={ () => { dispatch({ type: 'SET_PLAN', payload: { type: 'ARCADE', price: 9 } }) } }>
            <img src={ ArcadeImage } alt='arcade image' />
            <h4>Arcade</h4>
            <p>$9/mo</p>
            <p className="additional-content">2 months free</p> { /* Ensure that class active is only applied when plan is yearly */}
          </div>
          <div onClick={ () => { dispatch({ type: 'SET_PLAN', payload: { type: 'ADVANCED', price: 12 } }) } }>
            <img src={ AdvancedImage } alt='arcade image' />
            <h4>Advanced</h4>
            <p>$12/mo</p>
            <p className="additional-content">2 months free</p>
          </div>
          <div onClick={ () => { dispatch({ type: 'SET_PLAN', payload: { type: 'PRO', price: 15 } }) } }>
            <img src={ ProImage } alt='arcade image' />
            <h4>Pro</h4>
            <p>$15/mo</p>
            <p className="additional-content">2 months free</p>
          </div>
        </section>
        <section className='billing'>
          <p>Monthly</p>
          <label className="switch">
            <input type="checkbox"  onChange={ () => { dispatch({ type: 'SET_BILLING', payload: billing === 'MONTHLY' ? 'YEARLY' : 'MONTHLY' }) } }/>
            <span className="slider round"></span>
          </label>
          <p>Yearly</p>
        </section>
      </article>
      <section className='actions'>
        <Link to='/'>Go Back</Link>
        <button><Link to='/add-ons'>next</Link></button>
      </section>
    </>
  );
};