import { Link } from 'react-router-dom';

export function AddOns() {
  return (
    <div>
      <h1>Pick add-ons</h1>
      <Link to='/select-plan'>go back</Link>
      <button><Link to='/summary'>next</Link></button>
    </div>
  );
};