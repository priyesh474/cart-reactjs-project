import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../features/cartSlice';
export default function Header(){
  const count = useSelector(s => s.cart.items.reduce((a,b)=>a+b.qty,0));
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">My<span>Shop</span></div>
        <div className="tag">Modern products</div>
      </div>
      <div className="right">
        <button className="cart-btn" onClick={()=>dispatch(toggleCart())} aria-label="Open cart">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45c-.16.29-.25.63-.25.96 0 1.11.9 2 2 2h9v-2h-9l1.1-2h6.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-1.86-1.03L17.42 11H9.21L8.53 9H19V7H7z"/></svg>
          <span className="badge">{count}</span>
        </button>
      </div>
    </header>
  );
}
