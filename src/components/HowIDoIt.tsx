import { useLanguage } from './LanguageContext';

const HowIDoIt = () => {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: 'How I Do It',
      he: 'איך אני עושה את זה'
    },
    steps: [
      {
        title: {
          en: 'The Initial Meeting',
          he: 'פגישה ראשונית'
        },
        content: {
          en: 'In our first meeting, I get to know you and understand the functional needs of your space, your dreams and goals. Together we establish a precise work plan while maintaining your budget and timeline requirements.',
          he: 'בפגישה הראשונה אני מכירה אתכם ומבינה את הצרכים הפונקציונליים של החלל שלכם, החלומות והיעדים. יחד אנו קובעים תוכנית עבודה מדויקת תוך שמירה על תקציב ודרישות לוח הזמנים.'
        }
      },
      {
        title: {
          en: 'Planning & Visualization',
          he: 'תכנון והדמיה'
        },
        content: {
          en: 'During the planning phase, you\'ll see your vision come to life on paper. All my knowledge and experience are reflected in the detailed plans and various sketches. Together we\'ll select the final layout, then proceed to stunning 3D visualization.',
          he: 'בשלב התכנון תראו את החזון שלכם קורם עור וגידים על הנייר. כל הידע והניסיון שלי באים לידי ביטוי בתוכניות מפורטות ובסקיצות מגוונות. יחד נבחר את הפריסה הסופית ונמשיך להדמיה תלת מימדית מרהיבה.'
        }
      },
      {
        title: {
          en: 'Execution & Supervision',
          he: 'ביצוע וליווי'
        },
        content: {
          en: 'After design approval, we prepare complete construction documents and quantity schedules for pricing. We\'ll go on joint shopping trips to select finishes and furniture. I\'ll introduce you to my trusted suppliers who offer preferred pricing and exceptional quality.',
          he: 'לאחר אישור העיצוב, אנו מכינים מסמכי בנייה מלאים ולוחות כמויות לתמחור. נצא יחד לקניות לבחירת גמרים ורהיטים. אציג בפניכם את הספקים המהימנים שלי המציעים מחירים מועדפים ואיכות יוצאת דופן.'
        }
      },
      {
        title: {
          en: 'Project Completion',
          he: 'סיום הפרויקט'
        },
        content: {
          en: 'Regular site visits, professional guidance, and high-level supervision throughout the construction process. I prevent errors and miscommunications while keeping you updated at every stage until your beautifully designed, functional space is ready for use.',
          he: 'ביקורות סדירות באתר, ליווי מקצועי ופיקוח ברמה גבוהה לאורך כל תהליך הבנייה. אני מונעת טעויות ואי הבנות תוך שמירה על עדכון שוטף בכל שלב עד שהחלל המעוצב והפונקציונלי שלכם יהיה מוכן לשימוש.'
        }
      }
    ]
  };

  return (
    <section id="how-i-do-it" className="textured-background">
      <div className="process-section">
        <div className="process-container">
          <div className="process-column">
            <div className="process-widget-wrap">
              <div className="process-heading">
                <div className="process-widget-container">
                  <h2 className="process-title">{translations.title[language]}</h2>
                </div>
              </div>
              
              <div className="process-divider">
                <div className="process-widget-container">
                  <div className="divider">
                    <span className="divider-separator">
                      <div className="divider-icon">
                        ★
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="process-content">
                <div className="process-widget-container">
                  <div className="process-steps">
                    {translations.steps.map((step, index) => (
                      <div className="step-item" key={index}>
                        <div className="step-header">
                          <h3 className="step-title">{step.title[language]}</h3>
                        </div>
                        <div className="step-content">
                          <p>{step.content[language]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIDoIt;