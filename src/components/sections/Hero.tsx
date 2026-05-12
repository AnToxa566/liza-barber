import { useTranslations } from 'next-intl';
import { Placeholder } from '@/components/ui/Placeholder';
import { BookButton } from '@/components/ui/BookButton';
import { RiMapPinLine, RiPhoneLine, RiTimeLine } from 'react-icons/ri';

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
            <li><RiMapPinLine size={16} /><span>{t('address')}</span></li>
            <li><RiTimeLine size={16} /><span>{t('hours')}</span></li>
            <li><RiPhoneLine size={16} /><span>{t('phone')}</span></li>
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
