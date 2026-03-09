import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

const SERVICES = [
  {
    title: { en: 'Living Room Design', he: 'עיצוב חלל מגורים' },
    description: {
      en: 'Functional office design that combines business needs with special aesthetics to boost employee productivity.',
      he: 'אפיון המשרד יכלול את הדרישות הפונקציונליות של העסק בשילוב עיצוב מיוחד. העובד בחברה ייתן תפוקה גדולה יותר לבעליה.'
    },
    image: 'livingRoom.jpg'
  },
  {
    title: { en: 'Conference Room Design', he: 'עיצוב חדר ישיבות' },
    description: {
      en: 'From storefront to interior, creating distinctive design that attracts customers and delivers an unforgettable experience.',
      he: 'עיצוב החנות החל מחלון הראווה ועד למשיכת הלקוח להיכנס לחנות, יצירת בידול ושוני המתבטאים בעיצוב בלתי מתפשר במטרה למשוך את הלקוח לחוויה.'
    },
    image: 'conferenceRoom.jpg'
  },
  {
    title: { en: 'Cafe & Restaurant Design', he: 'עיצוב בתי קפה ומסעדות' },
    description: {
      en: 'Design that reflects your brand identity through color, graphics, and ambiance. Creating spaces where customers want to stay and return.',
      he: 'הססגוניות של העסק, הלוגו, השפה הגרפית והמותג יבואו לידי ביטוי בעיצוב בית הקפה/מסעדה. הלקוח יזכור את המותג דרך חווית הטעם והמראה של החלל המעוצב ירצה להישאר, להזמין ולחזור למקום.'
    },
    image: 'restaurant.jpg'
  },
  {
    title: { en: 'Lobby Design', he: 'עיצוב לובי' },
    description: {
      en: 'Elegant entrance halls that blend classic luxury with warm, welcoming atmosphere while optimizing space and lighting.',
      he: 'חלל כניסה אלגנטי ומזמין לבניין, המכיל מגוון סוגי דיירים, הלובי צריך להיות קלאסי, מפואר אך עדיין נותן תחושה חמה של בית תוך שמירה על ניצול נכון של החלל ותאורה.'
    },
    image: 'lobby.jpg'
  },
  {
    title: { en: 'Event Hall Design', he: 'עיצוב אולמות אירועים' },
    description: {
      en: 'Unforgettable event spaces that maximize seating capacity and profit while creating a spectacular, beautifully designed experience.',
      he: 'עיצוב אולם אירועים הוא חוויה של מופע מטורף, גדול וחזק שלא ישכח. חשוב לתכנן ולנצל את החלל כך שבעל האולם יוכל למקסם את השטח לטובת הושבה של שולחנות והגדלת הרווח מהאירוע, לצד חוויה מרווחת ומעוצבת להפליא.'
    },
    image: 'eventHall.jpg'
  }
];

const INITIAL_ACTIVE = 4;

const Services = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  // Track which indices have already had an Image() object created, to avoid duplicates
  const preloadedRef = useRef<Set<number>>(new Set());

  // ── Preload a single image by index ──────────────────────────────────────
  const preloadImage = useCallback((index: number) => {
    if (preloadedRef.current.has(index)) return;
    preloadedRef.current.add(index);

    const img = new Image();
    img.src = `/images/${SERVICES[index].image}`;
    img.onload = () => setLoadedImages(prev => new Set([...prev, index]));
    // On error still mark as "attempted" so we don't retry forever;
    // the background-color fallback will remain visible.
  }, []);

  // ── Preload ALL images in priority order once section is visible ──────────
  // Order: active first, then remaining indices with a small stagger so we
  // don't fire 5 parallel requests at once on slow connections.
  const preloadAll = useCallback(() => {
    const order = [
      INITIAL_ACTIVE,
      ...SERVICES.map((_, i) => i).filter(i => i !== INITIAL_ACTIVE)
    ];

    order.forEach((index, position) => {
      // Active image: immediate. Others: 150 ms apart so the browser can
      // prioritise the first request and still finish all before the user
      // reaches the section on a typical connection.
      setTimeout(() => preloadImage(index), position === 0 ? 0 : position * 150);
    });
  }, [preloadImage]);

  // ── IntersectionObserver: kick off preloading when section scrolls into view ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          preloadAll();
          observer.disconnect(); // only need to trigger once
        }
      },
      // Start loading slightly before the section is fully visible so images
      // are ready by the time the user actually sees the accordion.
      { rootMargin: '200px 0px', threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [preloadAll]);

  // ── Also preload the newly active image immediately on interaction ────────
  // (covers the edge case where the user interacts before the observer fires)
  useEffect(() => {
    preloadImage(activeIndex);
  }, [activeIndex, preloadImage]);

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // ── Interaction handlers ──────────────────────────────────────────────────
  const handleMouseEnter = (index: number) => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleClick = (index: number) => {
    if (!isMobile) return;
    if (activeIndex === index) {
      setActiveIndex((index + 1) % SERVICES.length);
    } else {
      setActiveIndex(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    if (Math.abs(e.touches[0].clientX - startXRef.current) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !isDraggingRef.current) return;
    const diffX = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      setActiveIndex(prev =>
        diffX > 0
          ? (prev + 1) % SERVICES.length
          : (prev - 1 + SERVICES.length) % SERVICES.length
      );
    }
    isDraggingRef.current = false;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div
        className="bdt-ep-image-accordion"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {SERVICES.map((service, index) => (
          <div
            key={index}
            className={`bdt-ep-image-accordion-item ${activeIndex === index ? 'active' : ''}`}
            style={{
              backgroundImage: loadedImages.has(index)
                ? `url(/images/${service.image})`
                : 'none',
              backgroundColor: loadedImages.has(index) ? 'transparent' : '#333'
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
