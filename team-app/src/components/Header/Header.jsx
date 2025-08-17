
import { Link } from "react-router-dom";
export default function Header(){
  return (
    <nav className="header">
      <Link to="/"><div>HOME</div></Link>
      <Link to="/about"><div>ABOUT</div></Link>
    </nav>
  );
}