import { useState, useEffect } from 'react';

const sections = ['services', 'projects', 'about', 'publications'];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.5] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar">
      <a href="#hero" className="navbar-logo">
        <img src="/assets/sds-dark-trans-shadow.png" alt="Shadow Dynamic Systems Logo" />
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
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Research</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#publications" className={activeSection === 'publications' ? 'active' : ''}>Publications</a></li>
        </ul>
      </nav>
    </header>
  );
}
