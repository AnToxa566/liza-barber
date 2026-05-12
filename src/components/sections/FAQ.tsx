'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

function IcoChev() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <section id="faq" className="sec sec--faq">
      <div className="container faq__grid">
        <header className="faq__head">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
        </header>

        <div className="faq__list">
          {items.map((item, i) => (
            <div key={i} className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
              >
                <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__q-text">{item.q}</span>
                <span className="faq__chev"><IcoChev /></span>
              </button>
              <div className="faq__a-wrap">
                <p className="faq__a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
