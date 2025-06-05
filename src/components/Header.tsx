import { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaInstagram, FaBars } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';

interface HeaderProps {
  onShowHowIDoIt: () => void;
}

const Header = ({ onShowHowIDoIt }: HeaderProps) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  
  const translations = {
    navItems: [
      { en: 'Home', he: 'עמוד בית' },
      { en: 'My Story', he: 'הסיפור שלי' },
      { en: 'How I Do It', he: 'איך אני עושה את זה' },
      { en: 'My Services', he: 'השירותים שלי' },
      { en: 'Contact', he: 'צור קשר' }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        const menuButton = document.querySelector('.menu-toggle');
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, link: string, action?: () => void) => {
    e.preventDefault();
    
    if (action) {
      action();
    } else if (link.startsWith('#')) {
      const sectionId = link.substring(1);
      scrollToSection(sectionId);
    } else {
      let sectionId = '';
      switch (link) {
        case '/':
          sectionId = 'hero';
          break;
        case '/my-story':
          sectionId = 'about';
          break;
        case '/projects':
          sectionId = 'services';
          break;
        default:
          return;
      }
      scrollToSection(sectionId);
    }
    
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  // הכנת מערך הנווט - סדר רגיל לאנגלית
  const englishNavItems = [
    { name: translations.navItems[0][language], link: '/', action: null },
    { name: translations.navItems[1][language], link: '/my-story', action: null },
    { name: translations.navItems[2][language], link: '/how-i-do-it', action: onShowHowIDoIt },
    { name: translations.navItems[3][language], link: '/projects', action: null },
    { name: translations.navItems[4][language], link: '#contact', action: null }
  ];

  // סדר הפוך לעברית - עמוד בית ראשון, צור קשר אחרון
  const hebrewNavItems = [
    { name: translations.navItems[0][language], link: '/', action: null }, // עמוד בית
    { name: translations.navItems[3][language], link: '/projects', action: null }, // השירותים שלי
    { name: translations.navItems[2][language], link: '/how-i-do-it', action: onShowHowIDoIt }, // איך אני עושה את זה
    { name: translations.navItems[1][language], link: '/my-story', action: null }, // הסיפור שלי
    { name: translations.navItems[4][language], link: '#contact', action: null } // צור קשר
  ];

  // בחירת המערך המתאים לפי השפה
  const navItems = language === 'he' ? hebrewNavItems : englishNavItems;

  return (
    <header className="header">
      <div className="container">
        <div className={`header-content ${language === 'he' ? 'rtl-layout' : ''}`}>
          <div className="logo">
            <a href="/" onClick={(e) => handleNavClick(e, '/')}>
              <img src="/images/landingPageLogo.png" alt="Company Logo" />
            </a>
          </div>

          {!isMobile ? (
            <nav className="desktop-nav">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.action ? (
                      <button 
                        onClick={(e) => handleNavClick(e, item.link, item.action)}
                        className="nav-button"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a 
                        href={item.link}
                        onClick={(e) => handleNavClick(e, item.link)}
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <>
              <button 
                className="menu-toggle" 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaBars />
              </button>
              <div 
                ref={mobileNavRef}
                className={`mobile-nav ${menuOpen ? 'open' : ''}`}
                style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}
              >
                <nav>
                  <ul>
                    {navItems.map((item, index) => (
                      <li key={index}>
                        {item.action ? (
                          <button 
                            onClick={(e) => handleNavClick(e, item.link, item.action)}
                            className="nav-button"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <a 
                            href={item.link} 
                            onClick={(e) => handleNavClick(e, item.link)}
                          >
                            {item.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>
          )}

          <div className="header-actions">
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;