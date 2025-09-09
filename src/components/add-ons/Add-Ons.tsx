import type { AddOnsState, AddOnsReducer, AddOnsAction, AddOnsPackage, AddOnsActionType } from './Add-Ons.types';

import { useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';

const packageTypes = {
  'Online service': {
    name: 'Online service',
    amount: 1
  },
  'Larger storage': {
    name: 'Larger storage',
    amount: 2
  },
  'Customisable profile': {
    name: 'Customisable profile',
    amount: 2
  }
};

const addOnsReducer: AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => {
  let { billingType, totalBill } = state;

  if (action.type === 'ADD') {
    state.packages.add(packageTypes[action.package] as AddOnsPackage);
  }
  else if (action.type === 'REMOVE') {
    state.packages.forEach((packageType) => {
      if (packageType.name === action.package) {
        state.packages.delete(packageType);
      }
    });
  }

  state.packages.forEach((packageType) => (
    totalBill += billingType === 'YEARLY' ? packageType.amount * 10 : packageType.amount
  ));

  return {
    ...state
  };
};

export function AddOns() {

  const addOnsState: AddOnsState = {
    billingType: 'MONTHLY',
    packages: new Set(),
    totalBill: 0
  };
  const [addOns, setAddOns] = useReducer(addOnsReducer, addOnsState);
  const { billingType } = addOns;

  const onlineServiceCheckbox = useRef<HTMLInputElement>(null);
  const largerStorageCheckbox = useRef<HTMLInputElement>(null);
  const customizableProfileCheckbox = useRef<HTMLInputElement>(null);

  const handleChange = (elementReference: React.RefObject<HTMLInputElement | null>) => {
    let result: 'ADD' | 'REMOVE' = 'ADD';
    if (elementReference.current) {
      if (!elementReference.current.checked) {
        result = 'REMOVE';
      }
    }

    return result;
  };

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
                onChange={ () => { setAddOns({ type: handleChange(onlineServiceCheckbox) as AddOnsActionType, package: 'Online service' }) } }
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
                onChange={ () => { setAddOns({ type: handleChange(largerStorageCheckbox) as AddOnsActionType, package: 'Larger storage' }) } }
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
                onChange={ () => {  } }
              />
              <label htmlFor='customizable-profile'>Customizable profile</label>
              <p>Custom theme on your profile</p>
              <p>+${ billingType === 'MONTHLY' ? '2/mo': '20/yr' }</p>
            </div>
          </section>
        </section>
        <section className='actions'>
          <Link to='/select-plan'>go back</Link>
          <button><Link to='/summary'>next</Link></button>
        </section>
      </article>
      <pre>
        { JSON.stringify(addOns, null, 2) }
      </pre>
    </>
  );
};