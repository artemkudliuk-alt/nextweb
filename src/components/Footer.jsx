import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import AsciiArrows from './AsciiArrows';

export default function Footer() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [isArrowsHovered, setIsArrowsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        } else {
          setRevealed(false);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    // Initialize Unicorn Studio for the footer scene if available
    if (window.UnicornStudio && window.UnicornStudio.init) {
      try {
        window.UnicornStudio.init();
        const canvasEl = document.getElementById('unicorn-footer');
        if (canvasEl) {
          canvasEl.style.opacity = '1';
        }
      } catch (e) {
        console.warn('Unicorn Studio footer init deferred:', e);
      }
    }
  }, [revealed]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={ref} className="main-footer">
      {/* Glow Line Sweep Divider */}
      <div className="tech-glow-divider" style={{ top: '-60px' }}>
        <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="tech-glow-grad-footer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="50%" stopColor="#A020F0" />
              <stop offset="100%" stopColor="#FF1493" />
            </linearGradient>
            <filter id="tech-glow-blur-footer" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line id="tech-glow-line-footer" x1="0" y1="60" x2="1440" y2="60" stroke="url(#tech-glow-grad-footer)" strokeWidth="8" filter="url(#tech-glow-blur-footer)" />
        </svg>
      </div>

      {/* Background WebGL Scene removed to let global main background show through */}

      <div className="footer-inner" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-main-row">

          {/* Right Column: Information Grid */}
          <div className="footer-right-content">
            <div className="footer-grid">
              {/* Column 1: Navigation (No title to match screenshot) */}
              <div className="footer-grid-col">
                <ul className="footer-col-list">
                  <li>
                    <Link to="/works" className="footer-col-link">Работы</Link>
                  </li>
                  <li>
                    <a href="#approach" className="footer-col-link" onClick={(e) => handleNavClick(e, '#approach')}>Подход</a>
                  </li>
                  <li>
                    <a href="#whyus" className="footer-col-link" onClick={(e) => handleNavClick(e, '#whyus')}>Почему мы</a>
                  </li>
                  <li>
                    <a href="#pricing" className="footer-col-link" onClick={(e) => handleNavClick(e, '#pricing')}>Цены</a>
                  </li>
                  <li>
                    <a href="#configurator" className="footer-col-link" onClick={(e) => handleNavClick(e, '#configurator')}>Конфигуратор</a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Follow Us & Contacts (Centered) */}
              <div className="footer-grid-col footer-col-center">
                <h4 className="footer-col-title">Мы в сети</h4>
                <div className="footer-contact-details">
                  <a href="mailto:office@nextweb.ua" className="footer-contact-item highlight">office@nextweb.ua</a>
                  <a href="tel:+380937894504" className="footer-contact-item">+38 (093) 789-45-04</a>
                </div>
                <div className="footer-social-icons">
                  <a href="https://t.me/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-icon-card" title="Telegram">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.47-.52-.17l-9.49 5.96-4.11-1.28c-.9-.28-.92-.9.19-1.33L19.82 5c.74-.28 1.39.18 1.15 1.25l-2.73 12.87c-.2.96-.77 1.2-1.57.75l-4.16-3.06-2.01 1.94c-.22.22-.41.41-.83.41z"/>
                    </svg>
                  </a>
                  <a href="https://behance.net/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-icon-card" title="Behance">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M22 10.4h-5.2c0-.7.4-1.2 1-1.2.6 0 .9.3.9.9h1.7c-.1-1.4-1.2-2.3-2.6-2.3-1.6 0-2.7 1.1-2.7 2.7s1.1 2.7 2.7 2.7c1.5 0 2.6-.9 2.7-2.3-1.6-.2-1.7-.5-1.7-.5zm-4.3-.2c0-.4.3-.7.7-.7.4 0 .7.3.7.7h-1.4zm-7.6-.8h-2V7h2c.7 0 1.2.3 1.2.9s-.5.9-1.2.9zm.2 3.1H8.1v-2.1H10.1c.8 0 1.3.4 1.3 1s-.5 1-1.1 1zM11.9 11c.5-.5.8-1.2.8-2 0-1.8-1.4-3.1-3.3-3.1H4.3v12.2h5.7c2 0 3.5-1.3 3.5-3.2 0-1.6-.8-2.6-1.6-2.9z"/>
                    </svg>
                  </a>
                  <a href="https://dribbble.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-icon-card" title="Dribbble">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 24C5.38 24 0 18.62 0 12S5.38 0 12 0s12 5.38 12 12-5.38 12-12 12zm9.36-11.83c-.37-.09-3.24-.75-6.52.34 1.37 3.66 1.94 6.56 1.99 6.83 2.66-1.72 4.46-4.63 4.53-7.17zm-6.24 8.14c-.08-.43-.72-3.4-2.19-7.14-3.13 1.03-5.78 1.03-6.09 1.03-.03 0-.05.01-.06.01-.02 3.88 2.65 7.15 6.27 7.74.87-.23 1.62-.77 2.07-1.64zm-9.36-1.57c.05-.28 1.01-4.88 6.57-6.43-.2-.45-.4-.9-.62-1.35-5.52 1.62-7.89 6.24-7.94 6.34 1.25 1.54 2.91 2.62 4.79 2.98zM2.03 9.9c.05-.09 3.03-5.26 8.35-6.19-.49 1.06-1 2.2-1.46 3.32-5.29 1.26-7.79 6.07-7.85 6.19a9.88 9.88 0 0 1-.04-3.32zm10.43-7.75c-1.9 0-3.69.5-5.26 1.38.4.82.83 1.67 1.28 2.52 4.75-1.59 6.83-4.57 6.95-4.74a9.88 9.88 0 0 0-2.96-.865zm4.85 2.47c-.09.135-2.03 2.945-6.66 4.305.22.485.42.98.62 1.47 4.78-1.255 7.82.16 7.92.205a9.88 9.88 0 0 0-1.87-5.98z"/>
                    </svg>
                  </a>
                  <a href="https://vk.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-icon-card" title="VKontakte">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M22.46 7.57c.18-.61-.3-1.07-1.17-1.07h-2.9c-.73 0-1.06.39-1.24.8 0 0-1.48 3.57-3.57 5.89-.67.67-.97.89-1.34.89-.19 0-.46-.22-.46-.85V7.57c0-.73-.21-1.07-.82-1.07H6.38c-.46 0-.73.34-.73.66 0 .69 1.03.85 1.14 2.79v4.22c0 .93-.17 1.1-.54 1.1-.99 0-3.41-3.6-4.84-7.72C1.13 6.78.89 6.5 1.18 6.5h2.9c.67 0 .97.31 1.14.8 0 0 2.25 5.25 5.23 8.61.93.93 1.34 1.25 1.85 1.25.28 0 .46-.31.46-1.21v-3.79c0-1.16-.34-1.63-1.35-1.75-.52-.06-.84-.37-.84-.37 0-.31.43-.63 1.21-.63h3.9c.56 0 .77.31.77.93v5.04c0 .58.11.8.34.8.46 0 1.27-.49 2.54-1.95 1.63-1.88 2.86-5.22 2.86-5.22.17-.46.52-.8 1.21-.8h2.9c.87 0 1.05.46.86 1.07-1.02 2.4-4.73 6.78-4.73 6.78-.46.67-.62.93 0 1.56 0 0 3.52 3.29 4.79 5.21.73 1.1 1.05 1.95.28 1.95h-2.9c-.93 0-1.34-.58-2.22-1.46-1.12-1.12-2.15-2.25-2.94-2.25-.37 0-.67.22-.67.89v2.01c0 .73-.21 1.07-.82 1.07H8.88C5.23 23 1 14.88 1 7.57"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Column 3: Address & Call to Action (Right-aligned) */}
              <div className="footer-grid-col footer-col-right">
                <h4 className="footer-col-title">Адрес</h4>
                <div className="footer-address-details">
                  <span>Украина, г. Киев</span>
                  <span>ул. Михаила Гришко, 3</span>
                  <span>БЦ «Палладиум Сити»</span>
                </div>
                <div className="footer-cta-wrapper" style={{ marginTop: '1.5rem' }}>
                  <Button text="Запланировать звонок" href="https://cal.com/nextweb/15min" target="_blank" rel="noopener noreferrer" variant="light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section wrapper containing copyright and giant wordmark */}
      <div className="footer-bottom-wrapper" style={{
        transform: revealed ? 'translateY(0%)' : 'translateY(100%)',
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Bottom copyright & credits */}
        <div className="footer-bottom">
          <div className="footer-copyright-row">
            <span>© 2026 NEXTWEB. Все права защищены.</span>
            <div className="footer-bottom-legal-links">
              <Link to="/terms" className="footer-bottom-legal-link">Пользовательское соглашение</Link>
              <Link to="/privacy" className="footer-bottom-legal-link">Политика конфиденциальности</Link>
            </div>
            <span>Разработано с любовью к деталям</span>
          </div>
        </div>

        {/* Giant Fullscreen Wordmark placed absolutely at the bottom */}
        <div className="footer-giant-wordmark">
          <div className="footer-ascii-canvas-small">
            <AsciiArrows isHovered={true} />
          </div>
          <span className="footer-wordmark-text">NEXTWEB</span>
        </div>
      </div>
    </footer>
  );
}
