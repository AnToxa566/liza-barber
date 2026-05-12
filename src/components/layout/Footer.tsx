'use client';

import { Fragment } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { socials } from '@/config/socials';

const LOCALES = ['bg', 'en', 'ru', 'uk', 'tr'] as const;

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
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
            ul. Knyaz Boris I 47<br />9000 Varna, Bulgaria<br />
            <a href="tel:+359884129031">+359 88 412 90 31</a><br />
            Tue–Sat · 10:00–20:00
          </p>
        </div>

        <div className="ftr__col">
          <span className="ftr__lbl">{t('langLabel')}</span>
          <div className="ftr__lang">
            {LOCALES.map((l, i) => (
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
        <span>Bookings via Altegio · GDPR</span>
      </div>
    </footer>
  );
}
