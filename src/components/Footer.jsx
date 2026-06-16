import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Footer() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [isArrowsHovered, setIsArrowsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

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
    <footer ref={ref} className="main-footer" style={{ padding: 0 }}>
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

      {/* Glass Card Container: Stretched to cover the entire footer area */}
      <div className="footer-glass-card" onMouseMove={handleMouseMove} style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        
        {/* Top Content Row (Statement & Download Button vs Tags & Socials) */}
        <div className="footer-glass-layout">
          {/* Left Column */}
          <div className="footer-glass-left">
            <h3 className="footer-brand-statement">
              Сложная веб-разработка,<br />
              дизайн на основе данных<br />
              и маркетинг в цифровой среде
            </h3>
            <span className="footer-brand-copyright">© NEXTWEB, 2009-2026</span>
            
            <a href="/presentation.pdf" className="footer-download-btn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="download-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <div className="download-text-wrap">
                <span className="download-title">Скачать презентацию</span>
                <span className="download-meta">.PDF / 6.8MB</span>
              </div>
            </a>
          </div>

          {/* Right Column */}
          <div className="footer-glass-right">
            <div className="footer-tags-group">
              <a href="#approach" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#approach')}>РАЗРАБОТКА</a>
              <a href="#approach" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#approach')}>ДИЗАЙН</a>
              <a href="#approach" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#approach')}>ПРОДВИЖЕНИЕ</a>
              <a href="#approach" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#approach')}>ПОДДЕРЖКА</a>
              <a href="#whyus" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#whyus')}>О НАС</a>
              <a href="#screen7" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#screen7')}>КОНТАКТЫ</a>
              <a href="#screen6" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#screen6')}>ОТЗЫВЫ</a>
              <a href="#whyus" className="footer-tag-pill" onClick={(e) => handleNavClick(e, '#whyus')}>ПАРТНЕРЫ</a>
              <Link to="/works" className="footer-tag-pill">БЛОГ</Link>
            </div>

            <div className="footer-contact-row">
              <a href="tel:+380487723543" className="footer-phone-large">048 772 35 43</a>
              <a href="mailto:office@nextweb.ua" className="footer-email-muted">OFFICE@NEXTWEB.UA</a>
            </div>

            <div className="footer-social-circles">
              <a href="https://t.me/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-circle telegram" title="Telegram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701-.332 4.965c.487 0 .702-.223.974-.485l2.337-2.27 4.861 3.59c.897.494 1.543.239 1.766-.83l3.189-15.032c.327-1.31-.5-1.905-1.363-1.517z"/>
                </svg>
              </a>
              <a href="https://facebook.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-circle facebook" title="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-circle instagram" title="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://behance.net/nextweb" target="_blank" rel="noopener noreferrer" className="footer-social-circle behance" title="Behance">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 14.2h-6.2c.1 1 .9 1.7 2 1.7 1.1 0 1.7-.5 1.9-1.2h2.2c-.4 1.9-2 3.3-4.1 3.3-2.6 0-4.3-1.8-4.3-4.3 0-2.6 1.8-4.3 4.3-4.3 2.5 0 4.2 1.8 4.2 4.3v.8zm-2-1.7c-.1-.9-.8-1.5-1.8-1.5-.9 0-1.7.6-1.9 1.5h3.7zm-9.3.8H8.3v1.8h2.4c.8 0 1.3-.4 1.3-1s-.5-.8-1.3-.8zm-.3-3.8H8.3v1.5h2.2c.7 0 1.1-.3 1.1-.8 0-.5-.4-.7-1.1-.7zm1.2 2.1c.5-.4.8-1 .8-1.8 0-1.6-1.2-2.6-3-2.6H4v11.7h6.6c2 0 3.2-1.1 3.2-2.7 0-1.1-.6-1.8-1.5-2.1zm5.1-4.7h4.8v1.3h-4.8v-1.3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Row (Directory Links Grid) */}
        <div className="footer-directory-grid">
          {/* Column 1: Brand details */}
          <div className="footer-directory-col brand-col">
            <h4 className="footer-logo-small">NEXTWEB</h4>
            <p className="footer-desc-text">
              Создаём цифровые продукты и решения, которые помогают бизнесам расти, автоматизировать процессы и выигрывать в конкурентной среде.
            </p>
            <div className="footer-heart-credit">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: '#FF1493' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Разработано с любовью к деталям</span>
            </div>
          </div>

          {/* Column 2: РАЗРАБОТКА */}
          <div className="footer-directory-col">
            <h4 className="footer-directory-title">РАЗРАБОТКА</h4>
            <ul className="footer-directory-list">
              <li><Link to="/works" className="footer-directory-link">Веб-разработка</Link></li>
              <li><Link to="/works" className="footer-directory-link">Интеграция и API</Link></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Поддержка и развитие</a></li>
            </ul>
          </div>

          {/* Column 3: ДИЗАЙН */}
          <div className="footer-directory-col">
            <h4 className="footer-directory-title">ДИЗАЙН</h4>
            <ul className="footer-directory-list">
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Веб-дизайн</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>UX/UI проектирование</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Брендинг</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Дизайн-системы</a></li>
            </ul>
          </div>

          {/* Column 4: ПРОДВИЖЕНИЕ */}
          <div className="footer-directory-col">
            <h4 className="footer-directory-title">ПРОДВИЖЕНИЕ</h4>
            <ul className="footer-directory-list">
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>SEO-продвижение</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Контекстная реклама</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>SMM</a></li>
              <li><a href="#approach" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#approach')}>Аналитика и стратегия</a></li>
            </ul>
          </div>

          {/* Column 5: КОМПАНИЯ */}
          <div className="footer-directory-col">
            <h4 className="footer-directory-title">КОМПАНИЯ</h4>
            <ul className="footer-directory-list">
              <li><a href="#whyus" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#whyus')}>О нас</a></li>
              <li><a href="#whyus" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#whyus')}>Партнёры</a></li>
              <li><a href="#screen6" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#screen6')}>Отзывы</a></li>
              <li><Link to="/works" className="footer-directory-link">Блог</Link></li>
              <li><a href="#screen7" className="footer-directory-link" onClick={(e) => handleNavClick(e, '#screen7')}>Контакты</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Address */}
        <div className="footer-bottom-bar">
          <span>© 2026 NEXTWEB. Все права защищены.</span>
          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-bottom-link">Пользовательское соглашение</Link>
            <Link to="/privacy" className="footer-bottom-link">Политика конфиденциальности</Link>
          </div>
          <span className="footer-bottom-address">Украина, г. Одесса, ул. Софиевская, 9, офис 21</span>
        </div>

      </div>
    </footer>
  );
}
