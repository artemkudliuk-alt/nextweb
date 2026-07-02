import { useEffect } from 'react';
import DraggableMarquee from '../components/DraggableMarquee';
import { motion } from 'framer-motion';

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
    document.title = 'Портфолио NEXTWEB | Наши работы';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Портфолио студии NEXTWEB — избранные работы по брендингу, веб-разработке, e-commerce и мобильным приложениям.');
    }
  }, []);

  return (
    <div id="works-page">
      <div className="grid-container">
        {/* Header */}
        <motion.div
          className="work-header"
          style={{ marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }}>Портфолио NEXTWEB — Наши работы</h1>
          <span className="cyber-section-label">// ВСЕ РАБОТЫ</span>
        </motion.div>

        {/* Gallery Cards */}
        <div className="work-cards" style={{ marginTop: '3rem' }}>
          <div className="works-gallery-grid">
            {allWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                className="work-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.07 }}
              >
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
                        <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="black" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Playground Section */}
      <section id="playground-section" style={{ marginTop: '8rem' }}>
        <motion.div
          className="playground-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cyber-section-label" style={{ marginBottom: '1.5rem' }}>// ПЕСОЧНИЦА</span>
          <p className="playground-desc">
            Небольшие фрагменты — сайты, бренды и эксперименты, которым не нужна отдельная страница.
          </p>
        </motion.div>
        <DraggableMarquee />
      </section>
    </div>
  );
}
