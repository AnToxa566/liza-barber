'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { BookButton } from '@/components/ui/BookButton';
import { socials } from '@/config/socials';

const LOCALES = ['bg', 'en', 'ru', 'uk', 'tr'] as const;

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
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
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
