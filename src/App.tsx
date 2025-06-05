import { useState, useEffect } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowIDoIt from './components/HowIDoIt';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showHowIDoIt, setShowHowIDoIt] = useState(false);

  const handleShowHowIDoIt = () => {
    setShowHowIDoIt(true);
  };

  useEffect(() => {
    if (showHowIDoIt) {
      const timer = setTimeout(() => {
        const element = document.getElementById('how-i-do-it');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [showHowIDoIt]);

  return (
    <LanguageProvider>
      <div className="App">
        <Header onShowHowIDoIt={handleShowHowIDoIt} />
        <Hero />
        <About onShowHowIDoIt={handleShowHowIDoIt} />
        {showHowIDoIt && <HowIDoIt />}
        <Services />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;