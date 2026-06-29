import './Header.css'
import { FaBeer } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <span><a href="/">Panto</a></span>
      <nav>
        <ul>
          <li><a href="/furniture">Furniture</a></li>
          <li><a href="/">Shop</a></li>
          <li><a href="/">About Us</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>
      <span className='shop-icon'><FaBeer /></span>
    </header>
  )
}

export default Header
