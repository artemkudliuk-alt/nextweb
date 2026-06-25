import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const blogArticles = [
  {
    id: "antigravity-performance",
    title: "Оптимизация производительности в экосистеме Antigravity 2.0",
    category: "Инженерия",
    date: "23 июня 2026",
    summary: "Как избежать перегрузки DOM-дерева и обеспечить FPS 60 на мобильных устройствах с помощью оптимизированных GPU-анимаций."
  },
  {
    id: "oklch-css-v4",
    title: "Использование цветового пространства OKLCH в Tailwind CSS v4",
    category: "Веб-дизайн",
    date: "14 мая 2026",
    summary: "Почему традиционный RGB/HEX уступает новому стандарту OKLCH и как создавать идеальные темные темы с высокой контрастностью."
  },
  {
    id: "lighthouse-ci-automation",
    title: "Автоматизация проверок Core Web Vitals с помощью Lighthouse CI",
    category: "DevOps",
    date: "02 апреля 2026",
    summary: "Пошаговое руководство по интеграции тестов производительности в ваш CI/CD пайплайн для блокировки медленного кода перед деплоем."
  }
];

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Технический блог NEXTWEB | Статьи об IT и разработке";
  }, []);

  return (
    <>
      <div className="service-detail-page blog-page-container">
        {/* Breadcrumbs */}
        <div className="service-breadcrumbs">
          <div className="grid-container">
            <div className="breadcrumbs-inner">
              <Link to="/">Главная</Link>
              <span className="separator">/</span>
              <span className="current">Блог</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// ТЕХНИЧЕСКИЙ БЛОГ</span>
                <h1 className="service-title">Блог</h1>
                <p className="service-intro">
                  Делимся опытом разработки высоконагруженных систем, проектирования интерфейсов, настройки DevOps инфраструктуры и поискового продвижения.
                </p>
              </div>

              <div className="service-visual-block">
                <div className="visual-placeholder-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="visual-card-glow"></div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)' }}>ENGINEERING</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.5rem' }}>ПРОДУКТОВЫЙ ХАБ</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Статьи, гайды и кейсы инженеров</div>
                </div>
              </div>
            </div>
          </section>

          {/* Articles list */}
          <section className="service-structure-section" style={{ marginTop: '2rem' }}>
            <div className="structure-grid" style={{ gridTemplateColumns: '1fr' }}>
              {blogArticles.map((article, idx) => (
                <div 
                  className="structure-card" 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    padding: '2.5rem',
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.01)',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span className="cyber-section-label">// {article.category.toUpperCase()}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', margin: 0 }}>{article.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, maxWidth: '800px' }}>
                    {article.summary}
                  </p>
                  <a href={`/blog/${article.id}`} className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }} onClick={(e) => e.preventDefault()}>
                    <span>ЧИТАТЬ СТАТЬЮ</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
