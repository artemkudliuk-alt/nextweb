import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactsPageSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  contact: z.string().min(5, { message: 'Введите e-mail или номер телефона' }),
  description: z.string().min(5, { message: 'Сообщение должно содержать минимум 5 символов' }),
});

function InteractiveNodesCanvas() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 350);
    let height = (canvas.height = canvas.parentElement.clientHeight || 350);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
      });
    }

    const mouse = { x: null, y: null, radius: 100 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160, 32, 240, 0.4)';
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(160, 32, 240, ${0.16 * (1 - dist / 85)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

export default function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Контакты NEXTWEB | Связаться с нами";
  }, []);

  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactsPageSchema),
    defaultValues: {
      name: '',
      contact: '',
      description: ''
    }
  });

  const onFormSubmit = (data) => {
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

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
              <motion.div
                className="service-hero-content"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
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
              </motion.div>

              <motion.div
                className="service-visual-block"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <div className="visual-placeholder-card" style={{ height: '100%', minHeight: '350px', position: 'relative', overflow: 'hidden' }}>
                  <InteractiveNodesCanvas />
                  <div className="visual-card-glow" style={{ zIndex: 1 }}></div>
                  <div className="visual-card-header-bar" style={{ zIndex: 2, position: 'relative' }}>
                    <div className="system-dots">
                      <span className="system-dot red"></span>
                      <span className="system-dot yellow"></span>
                      <span className="system-dot green"></span>
                    </div>
                  </div>
                  <div className="visual-card-body-content" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem' }}>ОТПРАВИТЬ БЫСТРЫЙ ЗАПРОС</div>
                    {formStatus === 'success' ? (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div className="contact-success-message" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                          <div className="success-icon-wrap" style={{ width: '52px', height: '52px' }}>
                            <svg className="success-svg" viewBox="0 0 52 52">
                              <circle className="success-circle" cx="26" cy="26" r="25" fill="none" />
                              <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                          </div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Заявка отправлена!</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Спасибо. Мы свяжемся с вами в ближайшее время.</div>
                          <button 
                            className="btn-secondary" 
                            style={{ marginTop: '1.25rem', border: 'none', cursor: 'pointer' }}
                            onClick={() => { setFormStatus('idle'); reset(); }}
                          >
                            <span>Отправить еще раз</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="input-group-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <input 
                            type="text" 
                            placeholder="Ваше имя" 
                            style={{ 
                              background: 'rgba(255,255,255,0.03)', 
                              border: errors.name ? '1px solid #ff4a4a' : '1px solid rgba(255,255,255,0.08)', 
                              padding: '0.8rem', 
                              color: '#fff', 
                              fontSize: '0.9rem', 
                              borderRadius: '4px',
                              outline: 'none'
                            }} 
                            {...register('name')}
                          />
                          {errors.name && <span className="field-error">{errors.name.message}</span>}
                        </div>
                        
                        <div className="input-group-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <input 
                            type="text" 
                            placeholder="E-mail или телефон" 
                            style={{ 
                              background: 'rgba(255,255,255,0.03)', 
                              border: errors.contact ? '1px solid #ff4a4a' : '1px solid rgba(255,255,255,0.08)', 
                              padding: '0.8rem', 
                              color: '#fff', 
                              fontSize: '0.9rem', 
                              borderRadius: '4px',
                              outline: 'none'
                            }} 
                            {...register('contact')}
                          />
                          {errors.contact && <span className="field-error">{errors.contact.message}</span>}
                        </div>

                        <div className="input-group-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <textarea 
                            placeholder="Краткое описание задачи" 
                            rows="3"
                            style={{ 
                              background: 'rgba(255,255,255,0.03)', 
                              border: errors.description ? '1px solid #ff4a4a' : '1px solid rgba(255,255,255,0.08)', 
                              padding: '0.8rem', 
                              color: '#fff', 
                              fontSize: '0.9rem', 
                              borderRadius: '4px', 
                              resize: 'none',
                              outline: 'none'
                            }}
                            {...register('description')}
                          />
                          {errors.description && <span className="field-error">{errors.description.message}</span>}
                        </div>

                        <button 
                          type="submit"
                          disabled={formStatus === 'sending'}
                          className="btn-premium" 
                          style={{ width: '100%', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
                        >
                          <span>{formStatus === 'sending' ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Map/FAQ section */}
          <motion.section
            className="service-details-section"
            style={{ marginBottom: '6rem' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
