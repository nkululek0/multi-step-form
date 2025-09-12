import type { FinishingUpState } from "./Finishing-Up.types";

import { Link } from "react-router-dom";
import { useRef } from "react";

export function FinishingUp() {

  const finishingUpState: FinishingUpState = {
    plan: { type: 'ARCADE', price: 9 },
    billing: 'MONTHLY',
    addOnsList: [
      { name: 'ONLINE SERVICE', price: 1 },
      { name: 'LARGER STORAGE', price: 2 },
      { name: 'CUSTOMISEABLE PROFILE', price: 2 }
    ],
  };
  const finishingUp = useRef(finishingUpState);
  const { plan, billing, addOnsList } = finishingUp.current;
  const billingAbbreviation = billing === 'MONTHLY' ? 'mo' : 'yr';

  return (
    <>
      <article className="finishing-up">
        <section className="content">
          <header>
            <h1>Finishing Up</h1>
            <p>Double-check everything looks OK before confirming.</p>
          </header>
          <article className="summary">
            <section className="add-ons-wrapper">
              <header className="add-ons-plan-header">
                <div>
                  <h3>{ plan.type } ({ billing })</h3>
                    <Link to='/add-ons'>Change</Link>
                </div>
                <p className="add-ons-plan-price">${ plan.price }{  billingAbbreviation }</p>
              </header>
              <hr />
              <div className="add-ons-list">
                {
                  addOnsList.map((addOn, key) => {
                    return (
                      <p className="add-on" key={ key }>
                        <span>{addOn.name}</span>
                        <span>+${addOn.price}/{ billingAbbreviation }</span>
                      </p>
                    );
                  })
                }
              </div>
            </section>
            <p className="add-ons-total">
              <span>Total (per { billing })</span>
              <span>+${ plan.price }{ billingAbbreviation }</span>
            </p>
          </article>
        </section>
        <section className="actions">
          <Link to='/add-ons'>Go Back</Link>
          <button><Link to='/summary'>Confirm</Link></button>
        </section>
      </article>
    </>
  );
}