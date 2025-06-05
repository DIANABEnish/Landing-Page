import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const Services = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(4);
  const [isMobile, setIsMobile] = useState(false);

  const translations = {
    services: [
      {
        title: {
          en: 'Living Room Design',
          he: 'עיצוב סלון'
        },
        description: {
          en: 'Characterizing the office will include the functional requirements of the business combined with a special design. The employee in the company will give greater output to its owners.',
          he: 'אפיון המשרד יכלול את הדרישות הפונקציונליות של העסק בשילוב עיצוב מיוחד. העובד בחברה ייתן תפוקה גדולה יותר לבעליה.'
        },
        image: 'livingRoom.jpg'
      },
      {
        title: {
          en: 'Conference Room Design',
          he: 'עיצוב חדר ישיבות'
        },
        description: {
          en: 'Designing the store from the shop window to attracting the customer to enter the store, creating differentiation and difference that is reflected in uncompromising design in order to attract the customer to the experience.',
          he: 'עיצוב החנות החל מחלון הראווה ועד למשיכת הלקוח להיכנס לחנות, יצירת בידול ושוני המתבטאים בעיצוב בלתי מתפשר במטרה למשוך את הלקוח לחוויה.'
        },
        image: 'conferenceRoom.jpg'
      },
      {
        title: {
          en: 'Cafe & Restaurant Design',
          he: 'עיצוב בתי קפה ומסעדות'
        },
        description: {
          en: 'The colorfulness of the business, the logo, the graphic language and the brand will be reflected in the design of the cafe/restaurant. The customer will remember the brand through the taste experience and the appearance of the designed space will want to stay, order and return to the place.',
          he: 'הססגוניות של העסק, הלוגו, השפה הגרפית והמותג יבואו לידי ביטוי בעיצוב בית הקפה/מסעדה. הלקוח יזכור את המותג דרך חווית הטעם והמראה של החלל המעוצב ירצה להישאר, להזמין ולחזור למקום.'
        },
        image: 'restaurant.jpg'
      },
      {
        title: {
          en: 'Lobby Design',
          he: 'עיצוב לובי'
        },
        description: {
          en: 'An elegant and inviting entrance hall to the building, which contains a variety of types of tenants, the lobby should be classic, luxurious but still gives a warm feeling of home while ensuring proper use of space and lighting.',
          he: 'חלל כניסה אלגנטי ומזמין לבניין, המכיל מגוון סוגי דיירים, הלובי צריך להיות קלאסי, מפואר אך עדיין נותן תחושה חמה של בית תוך שמירה על ניצול נכון של החלל ותאורה.'
        },
        image: 'lobby.jpg'
      },
      {
        title: {
          en: 'Event Hall Design',
          he: 'עיצוב אולמות אירועים'
        },
        description: {
          en: 'Designing an event hall is an experience of a crazy, big and powerful show that will not be forgotten. It is important to plan and utilize the space so that the owner of the hall can make the most of the area for the benefit of seating tables and increasing the profit from the event, alongside a spacious and beautifully designed experience.',
          he: 'עיצוב אולם אירועים הוא חוויה של מופע מטורף, גדול וחזק שלא ישכח. חשוב לתכנן ולנצל את החלל כך שבעל האולם יוכל למקסם את השטח לטובת הושבה של שולחנות והגדלת הרווח מהאירוע, לצד חוויה מרווחת ומעוצבת להפליא.'
        },
        image: 'eventHall.jpg'
      }
    ]
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="bdt-ep-image-accordion">
        {translations.services.map((service, index) => (
          <div 
            key={index}
            className={`bdt-ep-image-accordion-item ${activeIndex === index ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(/images/${service.image})`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          >
            <div className={`bdt-ep-image-accordion-content ${activeIndex === index ? 'show' : ''}`}>
              <h2 className="bdt-ep-image-accordion-title">
                {service.title[language]}
              </h2>
              
              <div className="bdt-ep-image-accordion-text">
                <p>{service.description[language]}</p>
              </div>
            </div>
            
            <div className="image-overlay" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;