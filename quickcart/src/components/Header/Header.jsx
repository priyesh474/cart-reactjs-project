import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, toggleDarkMode } from '../../features/cart/cartSlice';
import { Link, NavLink } from 'react-router-dom';
import d1 from '../../assets/dark-theme.png';
import './Header.css';

export default function Header() {
  const count = useSelector(s => s.cart.items.reduce((a, b) => a + b.qty, 0));
  const darkMode = useSelector(s => s.cart.darkMode);
  const dispatch = useDispatch();

  const handleTheme = () => {
    const nextDark = !darkMode;
    dispatch(toggleDarkMode());
    document.body.classList.toggle('darkmode', nextDark);
  };

  return (
    <header className="header">
      <Link to="/" className="brand">
        <div className="logo">Quick<span> Cart</span></div>
        <div className="tag">Curated Modern Products</div>
      </Link>

      <div className="right">
        <ul className="nav-list">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
          <li className="toggle-btn" onClick={handleTheme} title="Toggle theme">
            <img src={d1} alt="Toggle theme" />
          </li>
        </ul>

        <button className="cart-btn" onClick={() => dispatch(toggleCart())}>
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45c-.16.29-.25.63-.25.96 0 1.11.9 2 2 2h9v-2h-9l1.1-2h6.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-1.86-1.03L17.42 11H9.21L8.53 9H19V7H7z" />
          </svg>
          Cart
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
