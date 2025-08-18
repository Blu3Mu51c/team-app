
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <p3>Contact info: </p3><br/>
        <p3>Team:</p3>
        <ol>
          <li>Abdullah</li>
          <li>Sakeena</li>
          <li>Fatima</li>
          <li>Zahra</li>
          <li>Mohammed</li>
          <li>Hamza</li>
        </ol>
        <p3>Email: something@something.com</p3><br/><br/>


        <div className="footer__meta">
          <small>© {year} Team App</small>
          <small className="footer__muted"> Built with Vite + React Router</small>
        </div>
      </div>
    </footer>
  );
}
