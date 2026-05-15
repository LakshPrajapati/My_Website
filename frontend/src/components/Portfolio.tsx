import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './Footer';
import BackgroundMesh from './BackgroundMesh';
import SignatureDecryption from './systems/SignatureDecryption';
import TacticalAIChat from './systems/TacticalAIChat';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <BackgroundMesh />
      <div className="vignette-overlay" />
      <div className="noise-texture" />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <SignatureDecryption />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
        <TacticalAIChat />
      </main>
    </div>
  );
};

export default Portfolio;
