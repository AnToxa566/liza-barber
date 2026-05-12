import { useTranslations } from 'next-intl';
import { Placeholder } from '@/components/ui/Placeholder';
import { BookButton } from '@/components/ui/BookButton';

function IcoPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IcoClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IcoPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="top" className="hero hero--A">
      <div className="hero__inner hero__inner--split">
        <div className="hero__text">
          <span className="bar bar--v" aria-hidden="true" />
          <span className="kicker">{t('label')}</span>
          <h1 className="display">
            <span>{t('headlineA')}</span>
            <span>{t('headlineB')}</span>
          </h1>
          <p className="lead">{t('lead')}</p>

          <ul className="hero__meta">
            <li><IcoPin /><span>{t('address')}</span></li>
            <li><IcoClock /><span>{t('hours')}</span></li>
            <li><IcoPhone /><span>{t('phone')}</span></li>
          </ul>

          <div className="hero__ctas">
            <BookButton type="button" className="btn btn--primary btn--lg">
              {t('cta1')}
            </BookButton>
            <a href="#contact" className="btn btn--ghost btn--lg">
              {t('cta2')}
            </a>
          </div>
        </div>

        <div className="hero__photo">
          <Placeholder kind="portrait" tone="warm" caption="Portrait · Eliza · 3/4 length" tag="01"
            style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  );
}
