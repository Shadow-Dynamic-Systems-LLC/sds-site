import { useState, useEffect } from 'react';

interface Section {
  id: string;
  index: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', index: '00', label: 'INIT' },
  { id: 'services', index: '01', label: 'ZTG' },
  { id: 'about', index: '02', label: 'CORE' },
  { id: 'projects', index: '03', label: 'R&D' },
  { id: 'publications', index: '04', label: 'PUB' },
];

export function SectionGutter() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      const activationLine = scrollTop + window.innerHeight * 0.35;
      let currentSection = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= activationLine) {
          currentSection = section.id;
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
