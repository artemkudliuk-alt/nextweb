import React, { useEffect } from 'react';
import Grid from '../components/Grid';
import DraggableMarquee from '../components/DraggableMarquee';
import TextReveal from '../components/TextReveal';

const allWorks = [
  {
    id: 'mal-ai',
    title: 'Mal AI — Исламские финансы',
    category: 'Исследование бренда и айдентика',
    image: '/malai-card.webp',
    translateY: '20px'
  },
  {
    id: 'nr8',
    title: 'NR8 Global — Креативная студия',
    category: 'Веб-дизайн и разработка',
    image: '/nr8-banner.webp',
    translateY: '40px'
  },
  {
    id: 'ringed',
    title: 'Ringed — Брак и знакомства',
    category: 'Продуктовый дизайн · iOS и Android',
    image: '/ringed-banner.webp',
    translateY: '30px'
  },
  {
    id: 'drinklust',
    title: 'DrinkLust — Велнес и близость',
    category: 'Бренд, e-commerce и 3D',
    image: '/drinklust-banner.webp',
    translateY: '50px'
  },
  {
    id: 'collective-365',
    title: 'Collective 365 — Здоровье и фитнес',
    category: 'Мобильное приложение и продукт',
    image: '/collective-banner-card.webp',
    translateY: '25px'
  }
];

export default function Works() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="works-page">
      <div className="grid-container">
        {/* Header */}
        <div className="work-header" style={{ marginBottom: '3rem' }}>
          <span className="cyber-section-label">// ВСЕ РАБОТЫ</span>
        </div>

        {/* Gallery Cards */}
        <div className="work-cards" style={{ marginTop: '3rem' }}>
          <Grid cols={3}>
            {allWorks.map((work) => (
              <div key={work.id} className="work-card" style={{ gridColumn: 'span 1' }}>
                <a className="work-card-link" href={`/work/${work.id}`}>
                  <div className="work-card-image">
                    <div className="work-card-image-inner" style={{ transform: `translateY(${work.translateY})` }}>
                      <img src={work.image} alt={work.title} />
                    </div>
                  </div>
                  <div className="work-card-label">
                    <div className="work-card-label-text">
                      <span>{work.title}</span>
                      <span>{work.category}</span>
                    </div>
                    <div className="work-card-arrow">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="black"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Grid>
        </div>
      </div>

      {/* Playground Section */}
      <section id="playground-section" style={{ marginTop: '8rem' }}>
        <div className="playground-header">
          <span className="cyber-section-label" style={{ marginBottom: '1.5rem' }}>// ПЕСОЧНИЦА</span>
          <p className="playground-desc">
            Небольшие фрагменты — сайты, бренды и эксперименты, которым не нужна отдельная страница.
          </p>
        </div>
        <DraggableMarquee />
      </section>
    </div>
  );
}
