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
          {/* Left Column: Interactive ASCII Arrows Zone with Hover Logo */}
          <div className="footer-left-interactive">
            <div 
              className="footer-arrows-hover-zone"
              onMouseEnter={() => setIsArrowsHovered(true)}
              onMouseLeave={() => setIsArrowsHovered(false)}
            >
              {/* ASCII Arrows Canvas Component */}
              <div className="footer-ascii-canvas-wrap">
                <AsciiArrows isHovered={isArrowsHovered} />
              </div>
            </div>
          </div>

          {/* Right Column: Information Grid */}
          <div className="footer-right-content">
            <div className="footer-grid">
              {/* Column 1: Navigation */}
              <div className="footer-grid-col">
                <h4 className="footer-col-title">Навигация</h4>
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

              {/* Column 2: Socials */}
              <div className="footer-grid-col">
                <h4 className="footer-col-title">Соцсети</h4>
                <ul className="footer-col-list">
                  <li>
                    <a href="https://t.me/nextweb" target="_blank" rel="noopener noreferrer" className="footer-col-link">Telegram</a>
                  </li>
                  <li>
                    <a href="https://behance.net/nextweb" target="_blank" rel="noopener noreferrer" className="footer-col-link">Behance</a>
                  </li>
                  <li>
                    <a href="https://dribbble.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-col-link">Dribbble</a>
                  </li>
                  <li>
                    <a href="https://vk.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-col-link">VKontakte</a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Contacts */}
              <div className="footer-grid-col">
                <h4 className="footer-col-title">Контакты</h4>
                <ul className="footer-col-list">
                  <li>
                    <a href="mailto:office@nextweb.ua" className="footer-col-link highlight">office@nextweb.ua</a>
                  </li>
                  <li>
                    <a href="tel:+380937894504" className="footer-col-link">+38 (093) 789-45-04</a>
                  </li>
                  <li>
                    <a href="skype:forest_gymp?chat" className="footer-col-link">Skype: forest_gymp</a>
                  </li>
                </ul>
              </div>

              {/* Column 4: CTA & Legal */}
              <div className="footer-grid-col footer-col-cta">
                <h4 className="footer-col-title">Обсудить проект</h4>
                <div className="footer-cta-wrapper">
                  <Button text="Запланировать звонок" href="https://cal.com/nextweb/15min" target="_blank" rel="noopener noreferrer" variant="light" />
                </div>
                <div className="footer-legal-links">
                  <Link to="/privacy" className="footer-legal-link">Политика конфиденциальности</Link>
                  <Link to="/terms" className="footer-legal-link">Пользовательское соглашение</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="footer-bottom">
          <div className="footer-copyright-row">
            <span>© 2026 NEXTWEB. Все права защищены.</span>
            <span>Разработано с любовью к деталям</span>
          </div>
        </div>
      </div>

      {/* Giant Fullscreen Wordmark placed absolutely at the bottom */}
      <div className="footer-giant-wordmark" style={{
        transform: revealed ? 'translateY(0%)' : 'translateY(100%)',
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <span className="footer-wordmark-text">NEXTWEB</span>
      </div>
    </footer>
  );
}
