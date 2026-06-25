// Читаю это как: Компонент интерактивного калькулятора стоимости с динамическим визуальным веб-мокапом, язык: премиальный, хай-тек, дизайн-система Wezom/Satoshi-styled, с автоматическим применением правил AGENTS.md.

import { useState, useMemo } from 'react';

const ADDONS = [
  { id: 'seo', name: 'Техническая SEO-подготовка', price: 150, desc: 'Настройка метатегов, семантического ядра и микроразметки Schema.org' },
  { id: 'crm', name: 'Интеграция с CRM-системой', price: 250, desc: 'Связка лид-форм с вашим отделом продаж (amoCRM, Bitrix24)' },
  { id: 'copy', name: 'Копирайтинг и наполнение', price: 200, desc: 'Написание продающих текстов и оптимизация контента под разделы' },
  { id: 'lang', name: 'Мультиязычность (+2 версии)', price: 300, desc: 'Создание языковых версий сайта без наполнения' },
  { id: 'speed', name: 'Экстремальное ускорение PageSpeed', price: 180, desc: 'Достижение показателей 95+ баллов в мобильной версии Google Lighthouse' }
];

export default function ServiceCalculator({ basePriceString, serviceTitle }) {
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Extract base price number, default to 800 if parsing fails
  const basePrice = useMemo(() => {
    if (!basePriceString) return 800;
    const parsed = parseInt(basePriceString.replace(/\D/g, ''), 10);
    return isNaN(parsed) ? 800 : parsed;
  }, [basePriceString]);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    const addonsTotal = ADDONS.reduce((acc, addon) => {
      return acc + (selectedAddons.includes(addon.id) ? addon.price : 0);
    }, 0);
    return basePrice + addonsTotal;
  }, [basePrice, selectedAddons]);

  return (
    <div className="service-calculator-container">
      <div className="calculator-header">
        <span className="cyber-section-label">// КОНФИГУРАТОР ПРОЕКТА</span>
        <h3 className="calculator-title">Рассчитайте параметры вашего {serviceTitle}</h3>
        <p className="calculator-subtitle">
          Выберите дополнительные опции, чтобы рассчитать примерную стоимость и состав работ.
        </p>
      </div>

      <div className="calculator-grid">
        {/* Addons Selection List */}
        <div className="calculator-addons-list">
          {ADDONS.map((addon, index) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <label 
                key={addon.id} 
                className={`addon-label-card ${isChecked ? 'active' : ''}`}
                style={{ '--index': index }}
              >
                <input
                  type="checkbox"
                  className="addon-checkbox-hidden"
                  checked={isChecked}
                  onChange={() => toggleAddon(addon.id)}
                />
                <div className="addon-checkbox-custom">
                  <div className="addon-checkbox-dot"></div>
                </div>
                <div className="addon-info">
                  <span className="addon-name">{addon.name}</span>
                  <span className="addon-desc">{addon.desc}</span>
                </div>
                <div className="addon-price">
                  +{addon.price}&nbsp;у.е.
                </div>
              </label>
            );
          })}
        </div>

        {/* Dynamic Price Display Board & Browser Mockup Preview */}
        <div className="calculator-summary-board">
          <div className="summary-board-inner">
            {/* High-Fidelity Browser Mockup Preview */}
            <div className="preview-browser-mockup">
              <div className="browser-header">
                <div className="browser-dot red"></div>
                <div className="browser-dot yellow"></div>
                <div className="browser-dot green"></div>
                <div className="browser-address">nextweb.studio/preview</div>
              </div>
              <div className="browser-body">
                {/* Simulated Wireframe Layout */}
                <div className="mock-wireframe">
                  <div className="mock-header-row">
                    <div className="mock-logo"></div>
                    <div className="mock-nav-links">
                      <div className="mock-link"></div>
                      <div className="mock-link"></div>
                      {selectedAddons.includes('lang') && (
                        <div className="mock-lang-badges">
                          <span className="badge-flag">EN</span>
                          <span className="badge-flag">UA</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mock-hero-row">
                    <div className="mock-hero-text">
                      <div className="mock-text-line main"></div>
                      <div className="mock-text-line sub"></div>
                    </div>
                    {selectedAddons.includes('speed') ? (
                      <div className="mock-speed-meter active">
                        <svg viewBox="0 0 36 36" className="circular-chart green">
                          <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="circle" strokeDasharray="99, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <text x="18" y="20.35" className="percentage">99</text>
                        </svg>
                        <span className="meter-label">PageSpeed</span>
                      </div>
                    ) : (
                      <div className="mock-speed-meter">
                        <svg viewBox="0 0 36 36" className="circular-chart yellow">
                          <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="circle" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <text x="18" y="20.35" className="percentage">72</text>
                        </svg>
                        <span className="meter-label">PageSpeed</span>
                      </div>
                    )}
                  </div>

                  {/* Optional modules rendering dynamically */}
                  <div className="mock-modules-grid">
                    {selectedAddons.includes('copy') ? (
                      <div className="mock-module text active">
                        <div className="bar"></div>
                        <div className="bar short"></div>
                        <span className="mod-lbl">CONTENT</span>
                      </div>
                    ) : (
                      <div className="mock-module text">
                        <div className="bar empty"></div>
                        <span className="mod-lbl-empty">LOREM IPSUM</span>
                      </div>
                    )}

                    {selectedAddons.includes('seo') && (
                      <div className="mock-module seo active">
                        <div className="seo-graph">
                          <svg viewBox="0 0 50 20" className="seo-curve">
                            <path d="M0 18 Q 12 12, 25 8 T 50 2" fill="none" stroke="currentColor" strokeWidth="2.5" />
                          </svg>
                        </div>
                        <span className="mod-lbl">SEO ACTIVE</span>
                      </div>
                    )}

                    {selectedAddons.includes('crm') && (
                      <div className="mock-module crm active">
                        <div className="crm-node">
                          <div className="pulse-dot"></div>
                          <span className="crm-txt">CRM SYNC</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <span className="cyber-section-label">// РАСЧЕТ СТОИМОСТИ</span>
            <div className="summary-price-container">
              <div className="summary-price-label">Ориентировочная цена</div>
              <div className="summary-price-value-wrapper">
                <span className="summary-price-number">{totalPrice}</span>
                <span className="summary-price-currency">&nbsp;у.е.</span>
              </div>
            </div>

            <div className="summary-specs">
              <div className="spec-row">
                <span className="spec-name">Базовая стоимость</span>
                <span className="spec-val">{basePrice}&nbsp;у.е.</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Выбранные опции</span>
                <span className="spec-val">{selectedAddons.length}&nbsp;шт.</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Срок разработки</span>
                <span className="spec-val">
                  {selectedAddons.includes('speed') ? 'от 10 рабочих дней' : 'от 7 рабочих дней'}
                </span>
              </div>
            </div>

            <a 
              href="#contact" 
              className="btn-calculator-submit"
            >
              <span>Обсудить проект</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
