import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

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

const Hero = () => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video properties are set before attempting play
    video.muted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.play().catch(() => {
        // Autoplay was blocked – the poster image will remain visible as fallback.
        // No further action needed.
      });
    };

    if (video.readyState >= 3) {
      // Enough data already buffered (e.g. cached) – play immediately
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, []);

  return (
    <section className="hero">
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // poster is shown instantly while the video loads, and as a fallback
          // if autoplay is blocked. Replace with your actual poster image path.
          poster="/images/hero-poster.jpg"
          className="background-video"
        >
          <source src="/videos/background-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
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
