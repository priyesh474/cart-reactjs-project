import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem, clearCart, toggleCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { toINR } from '../../utils/currency';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((s, p) => s + toINR(p.price) * p.qty, 0);

  const handleCheckout = (e) => {
    if (items.length === 0) { e.preventDefault(); return; }
    dispatch(clearCart());
    dispatch(toggleCart());
  };

  return (
    <>
      <div className={'overlay ' + (isOpen ? 'open' : '')} onClick={() => dispatch(toggleCart())} />

      <aside className={'cart-drawer ' + (isOpen ? 'open' : '')}>
        <div className="cart-top">
          <h3>
            Your Cart
            {items.length > 0 && <span className="cart-count">({items.length})</span>}
          </h3>
          <button className="close" onClick={() => dispatch(toggleCart())}>✕</button>
        </div>

        <div className="cart-contents">
          {items.length === 0 ? (
            <div className="empty">
              <span className="empty-icon">🛍</span>
              <span>Your cart is empty</span>
              <span className="empty-sub">Add items to get started</span>
            </div>
          ) : (
            items.map(it => (
              <div className="cart-item" key={it.id}>
                <img src={it.image || it.thumbnail} alt={it.title} />
                <div className="meta">
                  <div className="title">{it.title}</div>
                  <div className="price">₹{(toINR(it.price) * it.qty).toLocaleString('en-IN')}</div>
                  <span className="prod-price">₹{toINR(it.price).toLocaleString('en-IN')} each</span>
                </div>
                <div className="cart-inner-box">
                  <div className="qty">
                    <button className="qbtn" onClick={() => dispatch(decreaseQty(it.id))}>−</button>
                    <div className="qnum">{it.qty}</div>
                    <button className="qbtn" onClick={() => dispatch(increaseQty(it.id))}>+</button>
                  </div>
                  <button className="del" onClick={() => dispatch(removeItem(it.id))} title="Remove">🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="total">
            <span>Total Amount</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>
          <div className="foot-actions">
            <button className="btn ghost" onClick={() => dispatch(clearCart())}>Clear All</button>
            <Link to="/success" className="btn primary" onClick={handleCheckout} state={{ total }}>
              Checkout →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
