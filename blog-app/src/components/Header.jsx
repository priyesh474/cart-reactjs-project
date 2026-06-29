import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <span>BLOG LOGO</span>
        <nav>
            <li><Link to="/">BlogList</Link></li>
            <li><Link to="/addblog">Add Blog</Link></li>
        </nav>
    </header>
  )
}

export default Header
