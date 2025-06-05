import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Hero = () => {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: 'Welcome to Our Studio',
      he: 'ברוכים הבאים לסטודיו שלנו'
    },
    subtitle: {
      en: 'Creating beautiful spaces that inspire',
      he: 'יצירת מרחבים יפים ומעוררי השראה'
    },
    button: {
      en: 'Get in Touch',
      he: 'צור קשר'
    }
  };

  return (
    <section className="hero">
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="background-video"
        >
          <source src="/videos/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>{translations.title[language]}</h1>
          <p>{translations.subtitle[language]}</p>
          <a href="#contact" className="btn">{translations.button[language]}</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;