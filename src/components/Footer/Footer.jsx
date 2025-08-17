import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <nav aria-label="Footer">
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <div className="footer__meta">
          <small>© {year} Team App</small>
          <small className="footer__muted">Built with Vite + React Router</small>
        </div>
      </div>
    </footer>
  );
}
