import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookButton } from '@/components/ui/BookButton';
import { RiMapPinLine, RiPhoneLine, RiTimeLine } from 'react-icons/ri';
import { PHONE, MAP_URL } from '@/config/contact';

export function Hero() {
  const t = useTranslations('hero');
  const tContact = useTranslations('contact');

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
            <li><RiMapPinLine size={16} /><span>{t('address', { street: tContact('street'), city: tContact('city') })}</span></li>
            <li><RiTimeLine size={16} /><span>{t('hours')}</span></li>
            <li><RiPhoneLine size={16} /><span>{PHONE}</span></li>
          </ul>

          <div className="hero__ctas">
            <BookButton type="button" className="btn btn--primary btn--lg">
              {t('cta1')}
            </BookButton>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
              {t('cta2')}
            </a>
          </div>
        </div>

        <div className="hero__photo">
          <Image src="/images/hero.jpg" alt={t('headlineA')} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
        </div>
      </div>
    </section>
  );
}
