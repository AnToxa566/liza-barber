import { useTranslations } from 'next-intl';
import { RiArrowRightLongLine } from 'react-icons/ri';
import { BookButton } from '@/components/ui/BookButton';

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
            {t('btn')} <RiArrowRightLongLine size={16} />
          </BookButton>
          <span className="cta-big__meta">{t('meta')}</span>
        </div>
      </div>
    </section>
  );
}
