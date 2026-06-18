import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Navbar({ onPlayClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle anchor navigation from other pages
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
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

  return (
    <>
      {/* Sticky Navbar (Always persistent from start to end) */}
      <nav className="navbar-sticky">
        <div className="grid-container">
          <div className="navbar-inner-sticky">
            {/* Left: Logo */}
            <Link to="/" className="nav-logo-link" aria-label="Home" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="nav-logo-stack">
                <img src="/NEXTWEB_background_mark.png" alt="NEXTWEB Mark" className="nav-logo-icon" />
                <img src="/Nextweb_logo.svg" alt="NEXTWEB" className="nav-logo-text" />
              </span>
            </Link>

            {/* Center: Menu links */}
            <div className="navbar-center">
              <a href="#whyus" className="nav-link active" onClick={(e) => handleNavClick(e, '#whyus')}>О нас</a>
              <a href="#approach" className="nav-link" onClick={(e) => handleNavClick(e, '#approach')}>Услуги</a>
              <Link to="/works" className="nav-link" onClick={() => setMenuOpen(false)}>Портфолио</Link>
              <a href="#screen7" className="nav-link" onClick={(e) => handleNavClick(e, '#screen7')}>Контакты</a>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '2rem', fontWeight: '500' }}>
          <a href="#whyus" onClick={(e) => handleNavClick(e, '#whyus')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>О нас</a>
          <a href="#approach" onClick={(e) => handleNavClick(e, '#approach')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Услуги</a>
          <Link to="/works" onClick={() => setMenuOpen(false)} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Портфолио</Link>
          <a href="#screen7" onClick={(e) => handleNavClick(e, '#screen7')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Контакты</a>
        </div>
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <a href="tel:+380937894504" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', color: '#ffffff', textDecoration: 'none', alignSelf: 'flex-start', padding: '0.5rem 0' }}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" style={{ overflow: 'visible' }}>
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

