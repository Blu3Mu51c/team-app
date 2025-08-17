import { Link } from "react-router-dom";

export default function NotFound(){ return(
    <div>
    <h1>Error</h1>
    <h3>Oops... Page Not Found</h3>
    <Link to={`/`}><button>Home</button></Link>
    </div>
); }