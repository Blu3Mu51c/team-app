import './Footer.css'
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
        <p3>Contact info: </p3><br/>
      <div className="footer__inner">
        <p3>+973 1234 1234</p3>
        <p3>Email: something@something.com</p3><br/><br/>
      </div>

        <div className="footer__meta">
          <small>© {year} Team App</small>
          <small className="footer__muted"> Built with Vite + React Router</small>
        </div>
      
    </footer>
  );
}
