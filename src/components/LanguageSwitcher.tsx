
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'active' : ''}
      >
        <img 
          src="//www.daniel-elmaliach.co.il/sinogol/flags/32/en-us.png" 
          alt="English" 
        />
      </button>
      <button 
        onClick={() => setLanguage('he')}
        className={language === 'he' ? 'active' : ''}
      >
        <img 
          src="//www.daniel-elmaliach.co.il/sinogol/flags/32/iw.png" 
          alt="Hebrew" 
        />
      </button>

      <style>{`
        .language-switcher {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .language-switcher button {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          opacity: 0.7;
        }

        .language-switcher button:hover,
        .language-switcher button.active {
          opacity: 1;
          transform: scale(1.1);
        }

        .language-switcher button img {
          width: 32px;
          height: 24px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;