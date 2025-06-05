import { useLanguage } from './LanguageContext';

type AboutProps = {
  onShowHowIDoIt: () => void;
};

const About: React.FC<AboutProps> = ({ onShowHowIDoIt }) => {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: 'My Story',
      he: 'הסיפור שלי'
    },
    content1: {
      en: 'Maya Cohen Design Studio, an architecture and interior design studio specializing in commercial spaces and luxury residential projects.',
      he: 'סטודיו מאיה כהן לעיצוב פנים ואדריכלות, מתמחה בעיצוב חללים מסחריים ופרויקטים פרטיים יוקרתיים.'
    },
    content2: {
      en: 'Maya Cohen, the studio owner, has dreamed of design since childhood and graduated with honors in architecture and interior design studies. With years of proven experience in the field, Maya completed additional specialization in commercial space design and excels at turning vision into beautifully crafted, functional spaces. She provides advanced tools, professional techniques, and personalized attention tailored to each client\'s unique needs.',
      he: 'מאיה כהן, בעלת הסטודיו, חלמה על עיצוב מאז ילדותה וסיימה בהצטיינות לימודי אדריכלות ועיצוב פנים. עם ניסיון מוכח של שנים בתחום, מאיה השלימה התמחות נוספת בעיצוב חללים מסחריים ומצטיינת בהפיכת חזון למרחבים מעוצבים, פונקציונליים ואיכותיים. היא מספקת כלים מתקדמים, טכניקות מקצועיות ותשומת לב אישית המותאמת לצרכים הייחודיים של כל לקוח.'
    },
    button: {
      en: 'Continue Reading',
      he: 'המשך קריאה'
    }
  };

  return (
    <div id="about" className="textured-background">
      <div className="about-section">
        <div className="about-container">
          <div className="about-column">
            <div className="about-widget-wrap">
              <div className="about-heading">
                <div className="about-widget-container">
                  <h2 className="about-title">{translations.title[language]}</h2>
                </div>
              </div>
              
              <div className="about-divider">
                <div className="about-widget-container">
                  <div className="divider">
                    <span className="divider-separator">
                      <div className="divider-icon">
                        ★
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="about-content">
                <div className="about-widget-container">
                  <div className="about-text">
                    <p>{translations.content1[language]}</p>
                    <p>{translations.content2[language]}</p>
                  </div>
                </div>
                
                <div className="about-button-section">
                  <div className="about-widget-container">
                    <div className="button-wrapper">
                      <button className="about-button" onClick={onShowHowIDoIt}>
                        <span className="button-content-wrapper">
                          <span className="button-icon">
                            <i className="fas fa-arrow-alt-circle-right"></i>
                          </span>
                          <span className="button-text">{translations.button[language]}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;