import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaStar } from 'react-icons/fa';
import { useLanguage } from './LanguageContext';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const translations = {
    title: {
      en: 'Shall we make an appointment?...',
      he: '...?נקבע פגישה'
    },
    form: {
      name: {
        en: 'Full name*',
        he: 'שם מלא*'
      },
      phone: {
        en: 'Phone*',
        he: 'טלפון*'
      },
      email: {
        en: 'Email if available',
        he: 'אימייל אם יש'
      },
      button: {
        en: 'Maya, call me back',
        he: 'מאיה, תחזרי אלי'
      }
    },
    speedDial: {
      en: 'Speed dial: 052-123-4567',
      he: 'חיוג מהיר: 052-123-4567'
    },
    sticky: {
      call: {
        en: 'Call me',
        he: 'התקשרו אלי'
      },
      or: {
        en: 'or',
        he: 'או'
      },
      whatsapp: {
        en: 'Send WhatsApp',
        he: 'שלחו וואטסאפ'
      }
    },
    successMessage: {
      en: 'Form submitted successfully!',
      he: 'הטופס נשלח בהצלחה!'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', phone: '', email: '' });
    alert(translations.successMessage[language]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="elementor-container">
          <h2 className="elementor-heading-title">{translations.title[language]}</h2>
          
          <div className="elementor-divider">
            <span className="elementor-divider-separator">
              <div className="elementor-icon elementor-divider__element">
                <FaStar />
              </div>
            </span>
          </div>
          
          <div className={`elementor-form ${language === 'he' ? 'rtl-form' : ''}`} onSubmit={handleSubmit}>
            <div className="elementor-form-fields-wrapper">
              <div className="elementor-field-group elementor-col-25">
                <input 
                  type="text"
                  name="name"
                  placeholder={translations.form.name[language]}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`elementor-field elementor-size-sm elementor-field-textual ${language === 'he' ? 'rtl-input' : ''}`}
                />
              </div>
              
              <div className="elementor-field-group elementor-col-25">
                <input 
                  type="tel"
                  name="phone"
                  placeholder={translations.form.phone[language]}
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`elementor-field elementor-size-sm elementor-field-textual ${language === 'he' ? 'rtl-input' : ''}`}
                />
              </div>
              
              <div className="elementor-field-group elementor-col-25">
                <input 
                  type="email"
                  name="email"
                  placeholder={translations.form.email[language]}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`elementor-field elementor-size-sm elementor-field-textual ${language === 'he' ? 'rtl-input' : ''}`}
                />
              </div>
              
              <div className={`elementor-field-group elementor-col-25 e-form__buttons ${language === 'he' ? 'button-last' : ''}`}>
                <button 
                  onClick={handleSubmit}
                  className="elementor-button elementor-size-sm"
                >
                  <span className="elementor-button-text">{translations.form.button[language]}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="quick-dial-section">
            <h3 className="elementor-heading-title">
              <a href="tel:0502000982">{translations.speedDial[language]}</a>
            </h3>
          </div>
        </div>
      </section>

      <section className="sticky-contact-bar">
        <style>{`
          .sticky-contact-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 12px 20px 16px;
            background: linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 100%);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1px solid rgba(255,255,255,0.07);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .sticky-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 13px 28px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
            white-space: nowrap;
            flex: 1;
            max-width: 220px;
          }

          .sticky-btn:hover {
            transform: translateY(-2px);
            opacity: 0.92;
          }

          .sticky-btn:active {
            transform: translateY(0px);
          }

          .sticky-btn svg {
            font-size: 16px;
            flex-shrink: 0;
          }

          .sticky-btn-call {
            background: transparent;
            color: #e8dcc8;
            border: 1.5px solid rgba(232,220,200,0.5);
            box-shadow: inset 0 0 0 0 rgba(232,220,200,0.08);
          }

          .sticky-btn-call:hover {
            border-color: rgba(232,220,200,0.9);
            box-shadow: 0 4px 24px rgba(232,220,200,0.1);
            color: #f5ede0;
          }

          .sticky-btn-whatsapp {
            background: transparent;
            color: #e8dcc8;
            border: 1.5px solid rgba(232,220,200,0.5);
          }

          .sticky-btn-whatsapp svg {
            color: #4dbb6e;
          }

          .sticky-btn-whatsapp:hover {
            border-color: rgba(232,220,200,0.9);
            box-shadow: 0 4px 24px rgba(232,220,200,0.1);
            color: #f5ede0;
          }

          .sticky-separator {
            color: rgba(255,255,255,0.2);
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            flex-shrink: 0;
          }

          @media (max-width: 400px) {
            .sticky-contact-bar {
              padding: 10px 12px 14px;
              gap: 8px;
            }
            .sticky-btn {
              padding: 12px 16px;
              font-size: 12px;
              gap: 7px;
              letter-spacing: 0.04em;
            }
            .sticky-separator {
              display: none;
            }
          }
        `}</style>

        <a href="tel:052-123-4567" className="sticky-btn sticky-btn-call">
          <FaPhoneAlt />
          <span>{translations.sticky.call[language]}</span>
        </a>

        <span className="sticky-separator">{translations.sticky.or[language]}</span>

        <a
          href="https://api.whatsapp.com/send?phone=972526225529&text=Hi%20I%20would%20like%20a%20consultation%20call%20thank%20you"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-btn sticky-btn-whatsapp"
        >
          <FaWhatsapp />
          <span>{translations.sticky.whatsapp[language]}</span>
        </a>
      </section>
      
      <div className="contact-spacer"></div>
    </>
  );
};

export default Contact;
