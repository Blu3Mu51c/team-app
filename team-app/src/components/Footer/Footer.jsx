
import { Link } from "react-router-dom";
export default function Footer(){
  return (
    <nav className="footer">
      <Link to="/"><div>HOME</div></Link>
      <Link to="/about"><div>ABOUT</div></Link>
    </nav>
  );
}