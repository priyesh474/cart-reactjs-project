import { Link, useLocation } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const { state } = useLocation();
  const total = state?.total;

  return (
    <div className="success-page">
      <div className="success-icon">✓</div>

      {total ? (
        <>
          <div className="col-green">
            <h1>Order Placed!</h1>
            <p>Your order has been successfully placed.</p>
          </div>
          <div className="order-total-wrap">
            <p className="order-total-label">Order Total</p>
            <p className="order-total-amount">₹{total.toLocaleString('en-IN')}</p>
          </div>
        </>
      ) : (
        <h1 className="no-order-msg">No order found.</h1>
      )}

      <Link to="/" className="home-link">← Continue Shopping</Link>
    </div>
  );
}
