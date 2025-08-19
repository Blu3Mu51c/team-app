import { NavLink } from "react-router-dom";
import "./Nav.css"
import logo from "../../assets/logo.png"


const linkClass = ({ isActive }) =>
  "nav-link" + (isActive ? " nav-link--active" : "");

export default function Nav() {
  return (
    <div className="navBar">
      <nav className="nav" aria-label="Main navigation">
        <img src={logo} alt="Logo" className="nav-logo" />
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/search" className={linkClass}>
          Search
        </NavLink>
      </nav>
    </div>
  );
}
