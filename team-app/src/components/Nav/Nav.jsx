
import { Link } from "react-router-dom";
export default function Nav(){
  return (
    <nav className="nav">
      <Link to="/"><div>HOME</div></Link>
      <Link to="/about"><div>ABOUT</div></Link>
      <Link to="/search"><div>SEARCH</div></Link>
      <Link to="/movie/:id"><div>MOVIE</div></Link>
    </nav>
  );
}