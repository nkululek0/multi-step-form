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
                <p className="add-ons-plan-price">${ plan.price }{  billing === 'MONTHLY' ? '/mo': '/yr' }</p>
              </header>
              <hr />
              {
                addOnsList.map((addOn) => {
                  return (
                    <div className="add-ons-list">
                      <p>{addOn.name}</p>
                      <p>{addOn.price}</p>
                    </div>
                  );
                })
              }
            </section>
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