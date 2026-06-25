import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Контакты NEXTWEB | Связаться с нами";
  }, []);

  return (
    <>
      <div className="service-detail-page">
        {/* Breadcrumbs */}
        <div className="service-breadcrumbs">
          <div className="grid-container">
            <div className="breadcrumbs-inner">
              <Link to="/">Главная</Link>
              <span className="separator">/</span>
              <span className="current">Контакты</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// СВЯЗАТЬСЯ С НАМИ</span>
                <h1 className="service-title">Контакты</h1>
                <p className="service-intro">
                  Обсудите свой проект с нашими архитекторами. Мы на связи по телефону, электронной почте, в мессенджерах или лично в нашем офисе.
                </p>
                <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Телефон компании</div>
                    <a href="tel:+380937894504" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', textDecoration: 'none' }}>+38 (093) 789-45-04</a>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Электронная почта</div>
                    <a href="mailto:office@nextweb.ua" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-color)', textDecoration: 'none' }}>office@nextweb.ua</a>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Адрес офиса</div>
                    <span style={{ fontSize: '1.2rem', color: '#fff' }}>г. Одесса, Приморский бульвар, 14</span>
                  </div>
                </div>
              </div>

              <div className="service-visual-block">
                <div className="visual-placeholder-card" style={{ height: '100%', minHeight: '350px' }}>
                  <div className="visual-card-glow"></div>
                  <div className="visual-card-header-bar">
                    <div className="system-dots">
                      <span className="system-dot red"></span>
                      <span className="system-dot yellow"></span>
                      <span className="system-dot green"></span>
                    </div>
                  </div>
                  <div className="visual-card-body-content" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem' }}>ОТПРАВИТЬ БЫСТРЫЙ ЗАПРОС</div>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                      <input 
                        type="text" 
                        placeholder="Ваше имя" 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', color: '#fff', fontSize: '0.9rem', borderRadius: '4px' }} 
                      />
                      <input 
                        type="email" 
                        placeholder="E-mail или телефон" 
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', color: '#fff', fontSize: '0.9rem', borderRadius: '4px' }} 
                      />
                      <textarea 
                        placeholder="Краткое описание задачи" 
                        rows="3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem', color: '#fff', fontSize: '0.9rem', borderRadius: '4px', resize: 'none' }}
                      />
                      <button className="btn-premium" style={{ width: '100%', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                        <span>ОТПРАВИТЬ ЗАЯВКУ</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map/FAQ section */}
          <section className="service-details-section" style={{ marginBottom: '6rem' }}>
            <div className="service-tagline-container">
              <h2 className="service-tagline">Свяжитесь с нашими экспертами в Telegram или запланируйте 15-минутный звонок.</h2>
              <p className="service-characteristics" style={{ marginBottom: '2.5rem' }}>
                Мы ценим ваше время, поэтому предлагаем быстрые каналы коммуникации. Нажмите на ссылки ниже, чтобы сразу начать диалог в удобном формате.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="https://t.me/nextweb" target="_blank" rel="noopener noreferrer" className="btn-premium">
                  <span>НАПИСАТЬ В TELEGRAM</span>
                </a>
                <a href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span>ЗАБРОНИРОВАТЬ ЗВОНОК</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
