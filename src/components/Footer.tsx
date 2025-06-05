


const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <div className="footer-container">
          <div className="footer-column">
            <div className="footer-widget-wrap">
              <section className="footer-inner-section">
                <div className="footer-inner-container">
                  <div className="footer-inner-column">
                    <div className="footer-inner-widget-wrap">
                      <div className="footer-text-widget">
                        <div className="footer-widget-container">
                          <p className="footer-text">
                            Built and designed by{' '}
                            <span className="footer-link-wrapper">
                              <a 
                                href="https://diana-portfolio1.netlify.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer-link"
                              >
                                <strong>Diana Benish</strong>
                              </a>
                            </span>
                            {' '}All rights reserved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;