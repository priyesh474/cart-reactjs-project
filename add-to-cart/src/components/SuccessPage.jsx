import { Link, useLocation } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const { total } = location.state || {};

  return (
    <div className="success-page">
      {total ? (
        <div className='col-green'>
          <h1>Order Successful!</h1>
          <p>Your total is ₹{total}</p>
        </div>
      ) : (
        <h1>No order information available.</h1>
      )}

      <Link to="/" className="home-link">
        Back to Home
      </Link>
    </div>
  );
}
