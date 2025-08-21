import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h1>Page Not Found :(</h1>
      <Link to="/">Home</Link>
    </div>
  );
};