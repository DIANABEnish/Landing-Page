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

      <section className="elementor-sticky-section">
        <div className="elementor-container">
          <div className="bdt-dual-button bdt-ep-button-wrapper">
            <a href="tel:052-123-4567" className="bdt-btn-a bdt-ep-button">
              <div className="bdt-btn-content-wrap">
                <div className="bdt-btn-icon bdt-a-icon">
                  <FaPhoneAlt />
                </div>
                <div className="bdt-btn-text">{translations.sticky.call[language]}</div>
              </div>
            </a>
            
            <span className="bdt-separator">{translations.sticky.or[language]}</span>
            
            <a 
              href="https://api.whatsapp.com/send?phone=972526225529&text=Hi%20I%20would%20like%20a%20consultation%20call%20thank%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="bdt-btn-b bdt-ep-button"
            >
              <div className="bdt-btn-content-wrap">
                <div className="bdt-btn-icon bdt-btn-b-icon">
                  <FaWhatsapp />
                </div>
                <div className="bdt-btn-text">{translations.sticky.whatsapp[language]}</div>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      <div className="contact-spacer"></div>
    </>
  );
};

export default Contact;