export function Navbar() {
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
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </nav>
    </header>
  );
}
