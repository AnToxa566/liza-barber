'use client';

import { Fragment } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { socials } from '@/config/socials';
import { locales } from '@/config/locales';
import { PHONE, MAP_URL } from '@/config/contact';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(l: string) {
    router.replace(pathname, { locale: l });
  }

  return (
    <footer className="ftr">
      <div className="container ftr__grid">
        <div className="ftr__col">
          <a href="#top" className="ftr__logo">Eliza<i>.</i></a>
          <p className="ftr__tag">{t('tag')}</p>
          <div className="ftr__sm">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="ftr__col">
          <span className="ftr__lbl">{t('navLabel')}</span>
          <a href="#services">{nav('services')}</a>
          <a href="#work">{nav('work')}</a>
          <a href="#reviews">{nav('reviews')}</a>
          <a href="#contact">{nav('contact')}</a>
        </div>

        <div className="ftr__col">
          <span className="ftr__lbl">{t('studioLabel')}</span>
          <p className="ftr__nap">
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer">{contact('address', { street: contact('street'), postalCode: contact('postalCode'), city: contact('city'), country: contact('country') })}</a><br />
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
          </p>
          <div className="ftr__hours">
            {(contact.raw('hours') as Array<{ d: string; h: string }>).map((row, i) => (
              <Fragment key={i}>
                <span>{row.d}</span>
                <span>{row.h}</span>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="ftr__col">
          <span className="ftr__lbl">{t('langLabel')}</span>
          <div className="ftr__lang">
            {locales.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span>·</span>}
                <button
                  type="button"
                  data-on={l === locale ? '1' : '0'}
                  onClick={() => switchLocale(l)}
                >
                  {l.toUpperCase()}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="ftr__btm container">
        <span>{t('rights')}</span>
        <span>{t('altegioNote')}</span>
      </div>
    </footer>
  );
}
