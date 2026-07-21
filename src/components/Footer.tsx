import { Link } from 'react-router-dom';

export function Footer() {
  const buildDate = new Date().toISOString().split('T')[0].replace(/-/g, '·');

  return (
    <footer>
      <div className="container">
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <p>&copy; 2025–2026 Shadow Dynamic Systems. All Rights Reserved.</p>
        <div className="footer-metadata">
          <span>NODE: SDS-PUBLIC-0x01</span>
          <span>BUILD: {buildDate}</span>
          <span>PROTOCOL: v0.3-draft</span>
        </div>
      </div>
    </footer>
  );
}
