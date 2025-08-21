import { Link } from 'react-router-dom';

export function Summary() {
  return (
    <div>
      <h1>Finishing Up</h1>
      <Link to='/add-ons'>Go Back</Link>
      <button>Confirm</button>
    </div>
  );
};