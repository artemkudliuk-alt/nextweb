import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const reviewsData = [
  {
    author: 'Константин Григорьев',
    company: 'Mal AI',
    position: 'CEO & Co-founder',
    text: 'Команда NextWeb проявила себя как надежный партнер в проектировании интерфейса нашей исламской финансовой платформы. Они смогли объединить сложные финансовые формулы в лаконичный и понятный пользователю дизайн.',
    rating: 5.0,
    category: 'branding',
    avatarColor: 'oklch(0.38 0.08 158)',
  },
  {
    author: 'Елена Чернова',
    company: 'NR8 Global',
    position: 'Product Manager',
    text: 'Разработка нашего нового сайта была выполнена безупречно. Скорость загрузки страниц на мобильных увеличилась в 3 раза, что сразу отразилось на росте конверсий в подписку.',
    rating: 5.0,
    category: 'development',
    avatarColor: 'oklch(0.40 0.10 250)',
  },
  {
    author: 'Александр Белов',
    company: 'Ringed',
    position: 'CTO',
    text: 'Сотрудничаем с NextWeb по модели почасовой разработки (T&M). Высокий профессионализм инженеров, прозрачная система Jira и быстрое закрытие спринтов. Крайне рекомендую.',
    rating: 4.9,
    category: 'development',
    avatarColor: 'oklch(0.42 0.09 30)',
  },
  {
    author: 'Ольга Морозова',
    company: 'DrinkLust',
    position: 'Marketing Director',
    text: 'NextWeb создали для нас потрясающий e-commerce магазин с 3D-интеграцией. Визуальный стиль полностью соответствует премиальности бренда, а платежный шлюз работает без единого сбоя.',
    rating: 5.0,
    category: 'marketing',
    avatarColor: 'oklch(0.38 0.12 340)',
  }
];

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="star-rating" aria-label={`Рейтинг ${rating} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="star-rating__star"
          viewBox="0 0 24 24"
          style={{ opacity: i < fullStars ? 0.95 : (i === fullStars && hasHalf ? 0.5 : 0.2) }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="star-rating__score">{rating.toFixed(1)}</span>
    </div>
  );
}

function MonogramAvatar({ name, color }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
  return (
    <div
      className="review-avatar"
      style={{ background: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Отзывы клиентов NEXTWEB | Мнения о нашей работе';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Отзывы клиентов о работе студии NEXTWEB. Средний рейтинг 4.95 на основе более 120 проектов.');
    }
  }, []);

  const filteredReviews = reviewsData.filter(
    (review) => activeCategory === 'all' || review.category === activeCategory
  );

  const categories = [
    { id: 'all', label: 'Все отзывы' },
    { id: 'development', label: 'Разработка' },
    { id: 'branding', label: 'Брендинг' },
    { id: 'marketing', label: 'Маркетинг' },
  ];

  return (
    <>
      <div className="service-detail-page">
        <div className="service-breadcrumbs">
          <div className="grid-container">
            <div className="breadcrumbs-inner">
              <Link to="/">Главная</Link>
              <span className="separator">/</span>
              <span className="current">Отзывы</span>
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
                <span className="cyber-section-label">// ОТЗЫВЫ КЛИЕНТОВ</span>
                <h1 className="service-title">Мнения о нас</h1>
                <p className="service-intro">
                  Репутация создается годами безупречной работы. Ознакомьтесь с оценками нашей работы от технологических компаний, брендов и стартапов, с которыми мы реализовали проекты.
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
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--accent-color)', fontFamily: 'var(--font-sans), sans-serif', lineHeight: 1 }}>4.95</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.75rem' }}>СРЕДНИЙ РЕЙТИНГ</div>
                  <StarRating rating={4.95} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>На основе более 120 клиентов</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Filter */}
          <motion.section
            className="reviews-filter-section"
            style={{ marginTop: '3rem', marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} role="tablist" aria-label="Фильтр отзывов">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={activeCategory === cat.id ? 'btn-premium' : 'btn-secondary'}
                  style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Reviews Grid */}
          <section className="service-structure-section" style={{ marginTop: '1rem' }}>
            <motion.div
              layout
              className="structure-grid"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
                    className="structure-card"
                    key={`${review.company}-${idx}`}
                    style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                        <span className="cyber-section-label">// {review.company.toUpperCase()}</span>
                        <StarRating rating={review.rating} />
                      </div>
                      <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: 0 }}>
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div className="review-author-row">
                      <MonogramAvatar name={review.author} color={review.avatarColor} />
                      <div className="review-author-info">
                        <div className="review-author-name">{review.author}</div>
                        <div className="review-author-position">{review.position}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* CTA */}
          <motion.section
            className="service-cta-section"
            style={{ marginBottom: '6rem', marginTop: '4rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-box">
              <div className="cta-glow" />
              <div className="cta-content">
                <h2>Хотите оставить свой отзыв или заказать проект?</h2>
                <p>Мы открыты к долгосрочному сотрудничеству и готовы реализовать проект любой сложности.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium"><span>Начать проект</span></a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
