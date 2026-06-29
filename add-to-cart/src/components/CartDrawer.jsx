import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem, clearCart, toggleCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((s, p) => s += Math.round(p.price * 85) * p.qty, 0);

  const handleCheckout = (e) => {
    if (items.length === 0) {
      e.preventDefault();
      alert('Your cart is empty');
      return;
    }
    dispatch(clearCart()); 
    dispatch(toggleCart());
  };

  return (
    <>
      <div className={'overlay ' + (isOpen ? 'open' : '')}></div>

      <aside className={'cart-drawer ' + (isOpen ? 'open' : '')}>
        <div className="cart-top">
          <h3>Your Cart</h3>
          <button className="close" onClick={() => dispatch(toggleCart())}>✕</button>
        </div>

        <div className="cart-contents">
          {items.length === 0 ? <div className="empty">Your cart is empty</div> :
            items.map(it => (
              <div className="cart-item" key={it.id}>
                <img src={it.image} alt={it.title} />
                <div className="meta">
                  <div className="title">{it.title}</div>
                  <div className="price">₹{Math.round(it.price * 85) * it.qty}</div>
                  <span className="prod-price">Price: ₹{Math.round(it.price * 85)}</span>
                </div>
                <div className='cart-inner-box'>

                  <div className="qty">
                    <button onClick={() => dispatch(decreaseQty(it.id))} className="qbtn">-</button>
                    <div className="qnum">{it.qty}</div>
                    <button onClick={() => dispatch(increaseQty(it.id))} className="qbtn">+</button>
                  </div>
                  <button className="del" onClick={() => dispatch(removeItem(it.id))}>🗑</button>
                </div>
              </div>
            ))}
        </div>

        <div className="cart-foot">
          <div className="total">Total <strong>₹{total}</strong></div>
          <div className="foot-actions">
            <button className="btn ghost" onClick={() => dispatch(clearCart())}>Clear</button>

            <Link  to="/success"  className="btn primary"  onClick={handleCheckout}  state={{ total }} >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
