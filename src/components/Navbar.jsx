import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { servicesData } from '../utils/servicesData';

const serviceGroups = [
  {
    title: "РАЗРАБОТКА",
    prefix: "01",
    items: [
      { id: "card", title: "Сайт-визитка" },
      { id: "showcase", title: "Сайт-витрина" },
      { id: "corporate", title: "Корпоративный сайт" },
      { id: "shop", title: "Интернет-магазин" },
      { id: "portal", title: "Веб-портал" },
      { id: "landing", title: "Landing Page" },
      { id: "app", title: "Веб-приложение" },
      { id: "interface", title: "Проектирование интерфейсов" }
    ]
  },
  {
    title: "БРЕНДИНГ И МАРКЕТИНГ",
    prefix: "02",
    items: [
      { id: "logo", title: "Разработка логотипа" },
      { id: "identity", title: "Фирменный стиль" },
      { id: "seo", title: "SEO-оптимизация" },
      { id: "ppc", title: "Контекстная реклама" },
      { id: "smm", title: "SMM-продвижение" }
    ]
  },
  {
    title: "ПОДДЕРЖКА И ОПЕРАЦИИ",
    prefix: "03",
    items: [
      { id: "support", title: "Поддержка сайтов" },
      { id: "audit", title: "Технический аудит" },
      { id: "ux-ui", title: "UX/UI консалтинг" },
      { id: "devops", title: "DevOps и облака" },
      { id: "hourly", title: "Почасовая разработка" },
      { id: "consulting", title: "IT-консалтинг" },
      { id: "copywriting", title: "Копирайтинг и контент" },
      { id: "analytics", title: "Веб-аналитика" }
    ]
  }
];

export default function Navbar({ onPlayClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Dropdown states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('card');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const leaveTimeoutRef = useRef(null);

  let lastScrollY = 0;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Scrolled threshold
      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      if (location.pathname === '/') {
        if (currentScrollY >= vh * 0.7) {
          setStickyVisible(true);
        } else {
          setStickyVisible(false);
        }
      } else {
        setStickyVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle anchor navigation from other pages
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    setDropdownOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for page load, then scroll
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const showFloating = scrolled && !menuOpen && !stickyVisible;
  const activeService = servicesData[activeServiceId] || servicesData['card'];

  if (isMobile) {
    return (
      <>
        {/* Mobile Persistent Header */}
        <nav className={`navbar-sticky visible ${scrolled ? 'is-scrolled' : ''}`}>
          <div className="grid-container">
            <div className="navbar-inner-sticky">
              {/* Left: Logo */}
              <Link to="/" className="nav-logo-link" aria-label="Home" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="nav-logo-stack">
                  <img src="/Nextweb_logo.svg" alt="NEXTWEB" className="nav-logo-text" />
                  <img src="/NEXTWEB_background_mark.png" alt="NEXTWEB Mark" className="nav-logo-hover-icon" />
                </span>
              </Link>

              {/* Mobile menu button */}
              <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <span>{menuOpen ? 'Закрыть' : 'Меню'}</span>
                <div className="btn-arrow-clip" style={{ width: '13px', height: '13px', display: 'inline-block' }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>
                    <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="white"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Full screen mobile menu drawer */}
        <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 2rem',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s ease, visibility 0.4s'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', fontSize: '1.8rem', fontWeight: '500', marginTop: '2rem' }}>
            <Link to="/about" onClick={() => setMenuOpen(false)} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>О нас</Link>
            
            {/* Mobile Services Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <span>Услуги</span>
                <span style={{ transform: mobileServicesOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', fontSize: '1.2rem' }}>→</span>
              </div>
              
              {mobileServicesOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '1rem', maxHeight: '35dvh', overflowY: 'auto' }} className="mobile-services-scroll">
                  <Link 
                    to="/services" 
                    onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                    style={{ fontSize: '1.1rem', color: 'var(--accent-color)', textDecoration: 'none', padding: '0.4rem 0', fontWeight: 'bold', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    → Все услуги
                  </Link>
                  {serviceGroups.map((group, idx) => (
                    <div key={idx} style={{ marginBottom: '0.8rem' }}>
                      <div 
                        onClick={() => setMobileActiveCategory(mobileActiveCategory === idx ? null : idx)}
                        style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0' }}
                      >
                        <span>{group.title}</span>
                        <span>{mobileActiveCategory === idx ? '−' : '+'}</span>
                      </div>
                      
                      {mobileActiveCategory === idx && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.8rem', marginTop: '0.4rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                          {group.items.map((item) => (
                            <Link 
                              key={item.id} 
                              to={`/service/${item.id}`} 
                              onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                              style={{ fontSize: '1rem', color: '#ffffff', textDecoration: 'none', padding: '0.2rem 0', display: 'block' }}
                            >
                              → {item.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/works" onClick={() => setMenuOpen(false)} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Портфолио</Link>
            <Link to="/contacts" onClick={() => setMenuOpen(false)} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Контакты</Link>
          </div>
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="tel:+380937894504" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.3rem', color: '#ffffff', textDecoration: 'none', alignSelf: 'flex-start', padding: '0.5rem 0' }}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="phone-icon-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" />
                    <stop offset="100%" stopColor="#FF1493" />
                  </linearGradient>
                </defs>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="url(#phone-icon-gradient-mobile)" />
              </svg>
              <span>+38 (093) 789-45-04</span>
            </a>
            <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Standard Desktop Header */}
      <nav 
        className={`navbar ${hidden ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''} ${dropdownOpen ? 'menu-active' : ''}`} 
        style={{ display: (location.pathname !== '/' && stickyVisible) ? 'none' : 'block' }}
      >
        <div className="grid-container">
          <div className="navbar-inner">
            {/* Left Nav links */}
            <div className="navbar-left">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setDropdownOpen(false)}>О нас</Link>
              <Link 
                to="/services" 
                className={`nav-link ${dropdownOpen ? 'active-dropdown' : ''}`} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setDropdownOpen(false)}
              >
                Услуги
              </Link>
              <Link to="/works" className={`nav-link ${location.pathname === '/works' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Портфолио</Link>
              <Link to="/contacts" className={`nav-link ${location.pathname === '/contacts' ? 'active' : ''}`} onClick={() => setDropdownOpen(false)}>Контакты</Link>
            </div>
 
            {/* Mobile menu button */}
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <span>{menuOpen ? 'Закрыть' : 'Меню'}</span>
              <div className="btn-arrow-clip" style={{ width: '13px', height: '13px', display: 'inline-block' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>
                  <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="white"></path>
                </svg>
              </div>
            </button>
 
            {/* Center Logo */}
            <Link to="/" className="nav-logo-link" aria-label="Home" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="nav-logo-stack">
                <img src="/Nextweb_logo.svg" alt="NEXTWEB" className="nav-logo-text" />
                <img src="/NEXTWEB_background_mark.png" alt="NEXTWEB Mark" className="nav-logo-hover-icon" />
              </span>
            </Link>
 
            {/* Right button */}
            <div className="navbar-right">
              <a href="tel:+380937894504" className="nav-phone-link" aria-label="Phone: +38 (093) 789-45-04">
                <div className="nav-phone-icon-wrap">
                  <svg className="nav-phone-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <defs>
                      <linearGradient id="phone-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D9FF" />
                        <stop offset="100%" stopColor="#FF1493" />
                      </linearGradient>
                    </defs>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="url(#phone-icon-gradient)" />
                  </svg>
                </div>
                <span className="nav-phone-number">+38 (093) 789-45-04</span>
              </a>
              <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky Desktop Header */}
      <nav className={`navbar-sticky ${stickyVisible ? 'visible' : ''} ${dropdownOpen ? 'menu-active' : ''}`}>
        <div className="grid-container">
          <div className="navbar-inner-sticky">
            {/* Left: Logo */}
            <Link to="/" className="nav-logo-link" aria-label="Home" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="nav-logo-stack">
                <img src="/Nextweb_logo.svg" alt="NEXTWEB" className="nav-logo-text" />
                <img src="/NEXTWEB_background_mark.png" alt="NEXTWEB Mark" className="nav-logo-hover-icon" />
              </span>
            </Link>

            {/* Center: Menu links */}
            <div className="navbar-center">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setDropdownOpen(false)}>О нас</Link>
              <Link 
                to="/services" 
                className={`nav-link ${dropdownOpen ? 'active-dropdown' : ''}`} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setDropdownOpen(false)}
              >
                Услуги
              </Link>
              <Link to="/works" className={`nav-link ${location.pathname === '/works' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Портфолио</Link>
              <Link to="/contacts" className={`nav-link ${location.pathname === '/contacts' ? 'active' : ''}`} onClick={() => setDropdownOpen(false)}>Контакты</Link>
            </div>

            {/* Right: Phone and Button */}
            <div className="navbar-right">
              <a href="tel:+380937894504" className="nav-phone-link" aria-label="Phone: +38 (093) 789-45-04">
                <div className="nav-phone-icon-wrap">
                  <svg className="nav-phone-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <defs>
                      <linearGradient id="phone-icon-gradient-sticky" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D9FF" />
                        <stop offset="100%" stopColor="#FF1493" />
                      </linearGradient>
                    </defs>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="url(#phone-icon-gradient-sticky)" />
                  </svg>
                </div>
                <span className="nav-phone-number">+38 (093) 789-45-04</span>
              </a>
              <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mega-Grid Dropdown Menu */}
      <div 
        className={`mega-dropdown ${dropdownOpen ? 'active' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid-container">
          <div className="mega-grid-inner">
            {/* 3 columns of grouped services */}
            {serviceGroups.map((group, groupIdx) => (
              <div className="mega-grid-col" key={groupIdx}>
                <span className="mega-col-title">// {group.prefix}_ {group.title}</span>
                <div className="mega-col-links">
                  {group.items.map((item) => (
                    <Link 
                      key={item.id} 
                      to={`/service/${item.id}`} 
                      className={`mega-item-link ${activeServiceId === item.id ? 'hovered' : ''}`}
                      onMouseEnter={() => setActiveServiceId(item.id)}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="mega-item-bullet">→</span>
                      <span className="mega-item-text">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {/* 4th Column: Preview panel */}
            <div className="mega-preview-col">
              <span className="mega-col-title">// 04_ ДЕТАЛИ И СТОИМОСТЬ</span>
              {activeService && (
                <div className="mega-preview-card animate-fade-in">
                  <h4 className="preview-title">{activeService.title}</h4>
                  <p className="preview-desc">{activeService.intro}</p>
                  <div className="preview-meta">
                    <div className="preview-meta-item">
                      <span className="meta-label">Бюджет:</span>
                      <span className="meta-value">{activeService.price}</span>
                    </div>
                    <div className="preview-meta-item">
                      <span className="meta-label">Категория:</span>
                      <span className="meta-value">{activeService.category}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                    <Button 
                      text="ПОДРОБНЕЕ О РЕШЕНИИ"
                      to={`/service/${activeServiceId}`}
                      onClick={() => setDropdownOpen(false)}
                      variant="light"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button when scrolled */}
      <div 
        className={`scroll-fixed-button ${showFloating ? 'visible' : ''}`} 
        style={{
          position: 'fixed',
          top: '12px',
          zIndex: 101,
          opacity: showFloating ? 1 : 0,
          transform: showFloating ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: showFloating ? 'auto' : 'none'
        }}
      >
        <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
      </div>
    </>
  );
}
