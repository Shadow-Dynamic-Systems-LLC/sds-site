import { useState, useEffect } from 'react';

interface Section {
  id: string;
  index: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', index: '00', label: 'INIT' },
  { id: 'services', index: '01', label: 'CORE' },
  { id: 'projects', index: '02', label: 'EXT' },
  { id: 'about', index: '03', label: 'SPEC' },
  { id: 'publications', index: '04', label: 'LOG' },
];

export function SectionGutter() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.1, 0.15, 0.3, 0.5] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Near bottom of page - activate last visible section
      if (progress > 0.95) {
        const lastSection = sections[sections.length - 1];
        const el = document.getElementById(lastSection.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            setActiveSection(lastSection.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="section-gutter" aria-label="Section navigation">
      <div className="gutter-line">
        <div
          className="gutter-progress"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>
      <ul className="gutter-indices">
        {sections.map(({ id, index, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
            >
              <span className="gutter-index">{index}</span>
              <span className="gutter-label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
