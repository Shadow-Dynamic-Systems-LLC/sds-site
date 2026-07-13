import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MemoryGraph } from './components/MemoryGraph';
import { Navbar } from './components/Navbar';
import { SectionGutter } from './components/SectionGutter';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Publications } from './components/Publications';
import { ArtifactPage } from './components/ArtifactPage';
import { ResearchPage } from './components/ResearchPage';
import { ContactPage } from './pages/ContactPage';
import { Footer } from './components/Footer';
import { useMinimalMode } from './hooks/useMinimalMode';
import './index.css';

function HomePage() {
  // Intersection observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.page-section');
    sections.forEach((section) => observer.observe(section));

    // Handle bottom-of-page sections that may not meet threshold
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      // Near bottom of page - ensure last section is visible
      if (progress > 0.85) {
        const el = document.getElementById('publications');
        if (el && !el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <SectionGutter />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Publications />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const minimal = useMinimalMode();

  return (
    <>
      {/* Fixed Background Layers — suppressed in minimal mode for double-blind preview.
          Forged Restraint v2: drafting-grid paper surface + the Living Graph
          ambient device, replacing the retired dark fracture-shader canvas. */}
      {!minimal && (
        <>
          <div className="drafting-grid-bg" aria-hidden="true" />
          <MemoryGraph opacity={0.85} />
        </>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dx/:slug" element={<ArtifactPage />} />
        <Route path="/research/:slug" element={<ResearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
