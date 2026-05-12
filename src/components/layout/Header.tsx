'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { BookButton } from '@/components/ui/BookButton';

const LOCALES = ['bg', 'en', 'ru', 'uk', 'tr'] as const;

function IcoIg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IcoTt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 4 V15 a4 4 0 1 1 -4 -4" />
      <path d="M14 4 c0 3 2 5 5 5" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  function switchLocale(l: string) {
    router.replace(pathname, { locale: l });
    setMenu(false);
  }

  const navItems = [
    ['services', t('services')],
    ['work', t('work')],
    ['reviews', t('reviews')],
    ['contact', t('contact')],
  ] as const;

  return (
    <header className={`hdr${scrolled ? ' hdr--scrolled' : ''}`}>
      <div className="hdr__inner">
        <a href="#top" className="hdr__logo" aria-label="Eliza, home">
          <span>Eliza<i>.</i></span>
        </a>

        <nav className="hdr__nav" aria-label="Main">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <div className="hdr__right">
          <div className="hdr__socials" aria-label="Social">
            <a href="https://www.instagram.com/liza.barber.varna" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IcoIg />
            </a>
            <a href="https://www.tiktok.com/@lizabarber" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <IcoTt />
            </a>
          </div>

          <div className="hdr__lang" role="group" aria-label="Language">
            {LOCALES.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span className="hdr__lang-sep" aria-hidden="true">·</span>}
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

          <BookButton type="button" className="btn btn--primary hdr__cta">
            {t('book')}
          </BookButton>

          <button
            type="button"
            className="hdr__burger"
            aria-label="Menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <span data-open={menu ? '1' : '0'}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {menu && (
        <div className="hdr__sheet" role="dialog" aria-label="Menu">
          <nav className="hdr__sheet-nav">
            {navItems.map(([id, label], idx) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                <span className="hdr__sheet-num">0{idx + 1}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="hdr__sheet-foot">
            <div className="hdr__lang hdr__lang--lg">
              {LOCALES.map((l, i) => (
                <Fragment key={l}>
                  {i > 0 && <span className="hdr__lang-sep">·</span>}
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
            <BookButton
              type="button"
              className="btn btn--primary"
              onClick={() => setMenu(false)}
            >
              {t('book')}
            </BookButton>
          </div>
        </div>
      )}
    </header>
  );
}
