import { Button } from '../button';
import type { NextButtonState, NextButtonReducer } from './Finishing-Up.types';

import { useGlobalContext } from '../../app/provider';

import { Link } from 'react-router-dom';
import { useReducer } from 'react';

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

export function FinishingUp() {

  const globalState = useGlobalContext();
  const plan = globalState.planAndBilling.plan;
  const billing = globalState.planAndBilling.billing;
  const addOnsList = globalState.addOns.addOnsList;
  const billingAbbreviation = billing === 'MONTHLY' ? 'mo' : 'yr';
  const total = addOnsList.reduce((total, addOn) => total + addOn.price, plan.price);

  const nextButtonState: NextButtonState = {
    uri: '/summary',
    isValid: false
  };
  const [nextButton, setNextButton] = useReducer(nextButtonReducer, nextButtonState);
  const { uri, isValid } = nextButton;

  return (
    <>
      <article className='finishing-up'>
        <section className='content'>
          <header>
            <h1>Finishing Up</h1>
            <p>Double-check everything looks OK before confirming.</p>
          </header>
          <article className='summary'>
            <section className='add-ons-wrapper'>
              <header className='add-ons-plan-header'>
                <div>
                  <h3>{ plan.type } ({ billing })</h3>
                  <Link to='/add-ons'>Change</Link>
                </div>
                <p className='add-ons-plan-price'>${ billing === 'MONTHLY' ? plan.price : plan.price * 10 }{  billingAbbreviation }</p>
              </header>
              { addOnsList.length > 0 && <hr /> }
              <div className='add-ons-list'>
                {
                  addOnsList.map((addOn, key) => {
                    return (
                      <p className='add-on' key={ key }>
                        <span>{ addOn.name }</span>
                        <span>+${ billing === 'MONTHLY' ? addOn.price : addOn.price * 10 }/{ billingAbbreviation }</span>
                      </p>
                    );
                  })
                }
              </div>
            </section>
            <p className='add-ons-total'>
              <span>Total (per { billing })</span>
              <span>+${ billing === 'MONTHLY' ? total : total * 10 }{ billingAbbreviation }</span>
            </p>
          </article>
        </section>
        <section className='actions'>
          <Link to='/add-ons'>Go Back</Link>
          <Button validationSettings={ { validate: setNextButton, uri: uri, isValid: isValid } } >Confirm</Button>
        </section>
      </article>
    </>
  );
};