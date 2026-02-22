import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CrackBackground } from './components/CrackBackground';
import { MemoryGraph } from './components/MemoryGraph';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import './index.css';

function App() {
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

    return () => observer.disconnect();
  }, []);

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

      {/* Scrollable Content */}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Blog />
      </main>
      <Footer />
    </>
  );
}

export default App;
