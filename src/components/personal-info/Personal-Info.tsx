import { Link } from 'react-router-dom';

export function PersonalInfo() {
  return (
    <div>
      <h1>Personal Info</h1>
      <button><Link to="/select-plan">Next</Link></button>
    </div>
  );
}