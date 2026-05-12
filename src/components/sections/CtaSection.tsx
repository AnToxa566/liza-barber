import { useTranslations } from 'next-intl';
import { BookButton } from '@/components/ui/BookButton';

function IcoArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function CtaSection() {
  const t = useTranslations('cta');

  return (
    <section className="cta-big cta-big--dark">
      <div className="container cta-big__inner">
        <div className="cta-big__l">
          <span className="kicker kicker--inv">{t('kicker')}</span>
          <h2 className="display display--cta">{t('title')}</h2>
        </div>
        <div className="cta-big__r">
          <p className="cta-big__sub">{t('sub')}</p>
          <BookButton type="button" className="btn btn--inv btn--lg">
            {t('btn')} <IcoArrow />
          </BookButton>
          <span className="cta-big__meta">{t('meta')}</span>
        </div>
      </div>
    </section>
  );
}
