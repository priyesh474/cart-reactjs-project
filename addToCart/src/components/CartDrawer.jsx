import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem, clearCart, toggleCart } from '../features/cartSlice';

export default function CartDrawer(){
  const { items, isOpen } = useSelector(s=>s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((s,p)=> s + (p.price * 85) * p.qty, 0);

  return (
    <aside className={'cart-drawer ' + (isOpen ? 'open' : '')} aria-hidden={!isOpen}>
      <div className="cart-top">
        <h3>Your Cart</h3>
        <button className="close" onClick={()=>dispatch(toggleCart())}>✕</button>
      </div>

      <div className="cart-contents">
        {items.length===0 ? <div className="empty">Your cart is empty</div> : items.map(it=>(
          <div className="cart-item" key={it.id}>
            <img src={it.image} alt={it.title} />
            <div className="meta">
              <div className="title">{it.title}</div>
              <div className="price">₹{Math.round(it.price * 85)}</div>

            </div>
            <div className="qty">
              <button onClick={()=>dispatch(decreaseQty(it.id))} className="qbtn">-</button>
              <div className="qnum">{it.qty}</div>
              <button onClick={()=>dispatch(increaseQty(it.id))} className="qbtn">+</button>
            </div>
            <button className="del" onClick={()=>dispatch(removeItem(it.id))}>🗑</button>
          </div>
        ))}
      </div>

      <div className="cart-foot">
        <div className="total">Total <strong>₹{total.toFixed(2)}</strong></div>
        <div className="foot-actions">
          <button className="btn ghost" onClick={()=>dispatch(clearCart())}>Clear</button>
          <button className="btn primary" onClick={()=>{
            if(items.length===0){ alert('Cart empty'); return; }
            alert(` Order Successful! Total: ₹${total.toFixed(2)}`);
            dispatch(clearCart()); dispatch(toggleCart());
          }}>Checkout</button>
        </div>
      </div>
    </aside>
  );
}
