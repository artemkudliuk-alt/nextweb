import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const reviewsData = [
  {
    author: "Константин Григорьев",
    company: "Mal AI",
    position: "CEO & Co-founder",
    text: "Команда NextWeb проявила себя как надежный партнер в проектировании интерфейса нашей исламской финансовой платформы. Они смогли объединить сложные финансовые формулы в лаконичный и понятный пользователю дизайн.",
    rating: "5.0"
  },
  {
    author: "Елена Чернова",
    company: "NR8 Global",
    position: "Product Manager",
    text: "Разработка нашего нового сайта была выполнена безупречно. Скорость загрузки страниц на мобильных увеличилась в 3 раза, что сразу отразилось на росте конверсий в подписку.",
    rating: "5.0"
  },
  {
    author: "Александр Белов",
    company: "Ringed",
    position: "CTO",
    text: "Сотрудничаем с NextWeb по модели почасовой разработки (T&M). Высокий профессионализм инженеров, прозрачная система Jira и быстрое закрытие спринтов. Крайне рекомендую.",
    rating: "4.9"
  },
  {
    author: "Ольга Морозова",
    company: "DrinkLust",
    position: "Marketing Director",
    text: "NextWeb создали для нас потрясающий e-commerce магазин с 3D-интеграцией. Визуальный стиль полностью соответствует премиальности бренда, а платежный шлюз работает без единого сбоя.",
    rating: "5.0"
  }
];

export default function Reviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Отзывы клиентов NEXTWEB | Мнения о нашей работе";
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
              <span className="current">Отзывы</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// ОТЗЫВЫ КЛИЕНТОВ</span>
                <h1 className="service-title">Мнения о нас</h1>
                <p className="service-intro">
                  Репутация создается годами безупречной работы. Ознакомьтесь с оценками нашей работы от технологических компаний, брендов и стартапов, с которыми мы реализовали проекты.
                </p>
              </div>

              <div className="service-visual-block">
                <div className="visual-placeholder-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="visual-card-glow"></div>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--accent-color)' }}>4.95</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.5rem' }}>СРЕДНИЙ РЕЙТИНГ ОТЗЫВОВ</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>На основе оценок более 120+ клиентов</div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Grid */}
          <section className="service-structure-section" style={{ marginTop: '2rem' }}>
            <div className="structure-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {reviewsData.map((review, idx) => (
                <div className="structure-card" key={idx} style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                      <span className="cyber-section-label">// {review.company.toUpperCase()}</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>⭐ {review.rating}</span>
                    </div>
                    <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      "{review.text}"
                    </p>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>{review.author}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="service-cta-section" style={{ marginBottom: '6rem', marginTop: '4rem' }}>
            <div className="cta-box">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h2>Хотите оставить свой отзыв или заказать проект?</h2>
                <p>Мы открыты к долгосрочному сотрудничеству и готовы реализовать проект любой сложности.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium">
                    <span>Начать проект</span>
                  </a>
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
