import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sections = ['services', 'about', 'projects', 'publications'];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const activationLine = window.scrollY + window.innerHeight * 0.35;
      let currentSection = '';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= activationLine) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header className="navbar">
      <a href="#hero" className="navbar-logo">
        <img src="/assets/sds-logo.png" alt="Shadow Dynamic Systems Logo" />
        <span className="logo-text">
          Shadow<span className="logo-accent">.</span>
          Dynamic<span className="logo-accent">.</span>
          Systems<span className="logo-accent">.</span>
          LLC
        </span>
      </a>
      <nav>
        <ul className="nav-links">
          <li><a href="#services" className={activeSection === 'services' ? 'active' : ''}>Governance</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Research</a></li>
          <li><a href="#publications" className={activeSection === 'publications' ? 'active' : ''}>Publications</a></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
