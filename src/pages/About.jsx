import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "О студии NEXTWEB | Премиум веб-разработка";
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
              <span className="current">О компании</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// О КОМПАНИИ</span>
                <h1 className="service-title">NEXTWEB</h1>
                <div className="price-tag">
                  <span className="price-label">Основано:</span>
                  <span className="price-value">2009 год</span>
                </div>
                <p className="service-intro">
                  Мы проектируем и разрабатываем высоконагруженные веб-системы, премиальные сайты, мобильные интерфейсы и стратегии цифрового маркетинга для лидеров рынка. Наша миссия — создавать программные продукты на стыке искусства и технологий.
                </p>
              </div>

              <div className="service-visual-block">
                <div className="visual-placeholder-card">
                  <div className="visual-card-glow"></div>
                  <div className="visual-card-header-bar">
                    <div className="system-dots">
                      <span className="system-dot red"></span>
                      <span className="system-dot yellow"></span>
                      <span className="system-dot green"></span>
                    </div>
                  </div>
                  <div className="visual-card-body-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)' }}>17+ ЛЕТ</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>БЕЗУПРЕЧНОЙ РЕПУТАЦИИ НА IT-РЫНКЕ</div>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>300+</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Кейсов</div>
                      </div>
                      <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>98%</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>LTV</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="service-details-section">
            <div className="service-tagline-container">
              <h2 className="service-tagline">Инженерный подход, эстетика минимализма и нацеленность на финансовый результат.</h2>
              <p className="service-characteristics">
                С 2009 года мы помогаем бизнесу находить общий язык с клиентами в цифровой среде. Мы глубоко погружаемся в бизнес-процессы каждого клиента, собираем требования по стандарту C4, строим надежные архитектурные решения и пишем чистый, поддерживаемый код, который летает на мобильных устройствах.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="service-structure-section">
            <div className="section-header">
              <span className="cyber-section-label">// НАШИ ЦЕННОСТИ</span>
              <h2>Принципы, на которых мы строим работу</h2>
              <p className="structure-desc">Мы верим, что долговечные продукты создаются только при бескомпромиссном отношении к качеству кода, дизайна и коммуникации.</p>
            </div>
            
            <div className="structure-grid">
              <div className="structure-card">
                <div className="structure-card-number">01</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Технологическое превосходство</h4>
                <p className="structure-card-text">Никакого устаревшего стека или медленных шаблонов. Пишем чистый JS, используем Vite, оптимизируем GPU-анимации и добиваемся Performance &ge; 95% в Lighthouse.</p>
              </div>
              <div className="structure-card">
                <div className="structure-card-number">02</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Дизайн для людей</h4>
                <p className="structure-card-text">Дизайн — это не просто красивая обложка. Это то, как продукт работает. Мы проектируем интерфейсы на основе глубокого UX-анализа и тестирования сценариев.</p>
              </div>
              <div className="structure-card">
                <div className="structure-card-number">03</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Честность и прозрачность</h4>
                <p className="structure-card-text">Работаем по гибкой методологии Time & Material или Fixed Price с детальным логированием времени. Вы всегда знаете, над какими задачами трудится команда.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="service-cta-section" style={{ marginBottom: '6rem' }}>
            <div className="cta-box">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h2>Хотите стать частью нашей истории?</h2>
                <p>Напишите нам, чтобы обсудить ваш проект или присоединиться к нашей инженерной команде.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium">
                    <span>Связаться с нами</span>
                  </a>
                  <Link to="/works" className="btn-secondary">
                    <span>Смотреть проекты</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
