import { Header } from '../components/Header';
import { Link } from 'react-router';
import './404.css';

export function Page404({ cart }) {
  return (
    <>
      <title>Page Not Found</title>

      <Header cart={cart} />

      <div className="page-404">
        <div className="error-code">404</div>
        <div className="error-message">Page Not Found</div>
        <Link to="/" className="back-to-home-link link-primary">
          Back to Home
        </Link>
      </div>
    </>
  );
}