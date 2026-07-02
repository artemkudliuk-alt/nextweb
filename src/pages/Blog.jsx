import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const blogArticles = [
  {
    id: 'antigravity-performance',
    title: 'Оптимизация производительности в экосистеме Antigravity 2.0',
    category: 'Инженерия',
    date: '23 июня 2026',
    summary: 'Как избежать перегрузки DOM-дерева и обеспечить FPS 60 на мобильных устройствах с помощью оптимизированных GPU-анимаций.',
    iconType: 'cpu',
  },
  {
    id: 'oklch-css-v4',
    title: 'Использование цветового пространства OKLCH в Tailwind CSS v4',
    category: 'Веб-дизайн',
    date: '14 мая 2026',
    summary: 'Почему традиционный RGB/HEX уступает новому стандарту OKLCH и как создавать идеальные темные темы с высокой контрастностью.',
    iconType: 'swatch',
  },
  {
    id: 'lighthouse-ci-automation',
    title: 'Автоматизация проверок Core Web Vitals с помощью Lighthouse CI',
    category: 'DevOps',
    date: '02 апреля 2026',
    summary: 'Пошаговое руководство по интеграции тестов производительности в ваш CI/CD пайплайн для блокировки медленного кода перед деплоем.',
    iconType: 'server',
  }
];

function CategoryIcon({ type }) {
  if (type === 'cpu') {
    return (
      <svg className="blog-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </svg>
    );
  }
  if (type === 'swatch') {
    return (
      <svg className="blog-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
        <path d="M2 13.5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2" />
        <path d="M6 11.5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7.5" />
        <path d="M10 11.5v-5" />
        <path d="M14 11.5v-5" />
      </svg>
    );
  }
  // server
  return (
    <svg className="blog-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  );
}

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Технический блог NEXTWEB | Статьи об IT и разработке';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Технический блог студии NEXTWEB: статьи о веб-разработке, дизайне, DevOps и оптимизации производительности.');
    }
  }, []);

  return (
    <>
      <div className="service-detail-page blog-page-container">
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
          {/* Hero */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <motion.div
                className="service-hero-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="cyber-section-label">// ТЕХНИЧЕСКИЙ БЛОГ</span>
                <h1 className="service-title">Блог</h1>
                <p className="service-intro">
                  Делимся опытом разработки высоконагруженных систем, проектирования интерфейсов, настройки DevOps инфраструктуры и поискового продвижения.
                </p>
              </motion.div>

              <motion.div
                className="service-visual-block"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              >
                <div className="visual-placeholder-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="visual-card-glow" />
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)', fontFamily: 'var(--font-sans), sans-serif' }}>ENGINEERING</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.5rem' }}>ПРОДУКТОВЫЙ ХАБ</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Статьи, гайды и кейсы инженеров</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Articles */}
          <section className="service-structure-section" style={{ marginTop: '2rem' }}>
            <div className="structure-grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {blogArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  className="blog-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.07 }}
                >
                  <div className="blog-card-meta">
                    <div className="blog-card-category">
                      <CategoryIcon type={article.iconType} />
                      <span className="cyber-section-label">// {article.category.toUpperCase()}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', margin: 0 }}>{article.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, maxWidth: '800px' }}>
                    {article.summary}
                  </p>
                  <a
                    href={`/blog/${article.id}`}
                    className="btn-secondary"
                    style={{ marginTop: '0.5rem', display: 'inline-flex' }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>ЧИТАТЬ СТАТЬЮ</span>
                  </a>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
