import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { CrackBackground } from './components/CrackBackground';
import { MemoryGraph } from './components/MemoryGraph';
import { Navbar } from './components/Navbar';
import { SectionGutter } from './components/SectionGutter';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Publications } from './components/Publications';
import { ArtifactPage } from './components/ArtifactPage';
import { Footer } from './components/Footer';
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
        <Projects />
        <About />
        <Publications />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      {/* Fixed Background Layers */}
      <div id="canvas-container">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, depth: false, alpha: false }}
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
          style={{ background: '#0a0a0a' }}
        >
          <Suspense fallback={null}>
            <CrackBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Memory Graph Layer - separate fixed layer */}
      <MemoryGraph opacity={0.35} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dx/:slug" element={<ArtifactPage />} />
      </Routes>
    </>
  );
}

export default App;
