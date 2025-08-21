import { Link } from "react-router-dom";

export function SelectPlan() {
  return (
    <div>
      <h1>Select your Plan</h1>
      <Link to='/'>go back</Link>
      <button><Link to='/add-ons'>next</Link></button>
    </div>
  );
};