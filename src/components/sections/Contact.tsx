import { useTranslations } from 'next-intl';
import { BookButton } from '@/components/ui/BookButton';
import { socials } from '@/config/socials';

function IcoPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
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

function MapMock() {
  return (
    <div className="map">
      <svg className="map__bg" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="mp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 0H20M0 0V20" fill="none" stroke="rgba(0,0,0,.05)" strokeWidth="0.5" />
          </pattern>
          <pattern id="mp-grid2" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 0H100M0 0V100" fill="none" stroke="rgba(0,0,0,.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="#eef0ee" />
        <rect width="400" height="400" fill="url(#mp-grid)" />
        <rect width="400" height="400" fill="url(#mp-grid2)" />
        <path d="M0 240 C100 220 220 260 400 220" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="14" strokeLinecap="round" />
        <path d="M40 60 L240 80 L260 240 L120 360" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="6" />
        <path d="M340 0 L300 200 L380 400" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="6" />
        <rect x="160" y="100" width="80" height="60" fill="rgba(0,0,0,.05)" />
        <rect x="60" y="170" width="60" height="50" fill="rgba(0,0,0,.05)" />
        <rect x="280" y="120" width="50" height="40" fill="rgba(0,0,0,.05)" />
      </svg>
      <div className="map__pin">
        <span className="map__pin-dot" />
        <span className="map__pin-card">
          <strong>Eliza.</strong>
          <span>Knyaz Boris I 47</span>
        </span>
      </div>
      <div className="map__chrome">
        <span>43.2087° N · 27.9168° E</span>
        <a href="https://maps.google.com/?q=ul.+Knyaz+Boris+I+47,+Varna" target="_blank" rel="noopener noreferrer" className="map__open">
          Open in Maps →
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  const t = useTranslations('contact');
  const hours = t.raw('hours') as Array<{ d: string; h: string }>;
  const phone = t('phone');

  return (
    <section id="contact" className="sec sec--contact">
      <div className="container contact__grid">
        <div className="contact__l">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>

          <div className="contact__block">
            <span className="contact__lbl">Studio</span>
            <p className="contact__addr">
              <IcoPin /> {t('address')}
            </p>
          </div>

          <div className="contact__block">
            <span className="contact__lbl">Hours</span>
            <table className="contact__hours">
              <tbody>
                {hours.map((row, i) => (
                  <tr key={i}>
                    <td>{row.d}</td>
                    <td>{row.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="contact__block">
            <span className="contact__lbl">Contact</span>
            <a className="contact__phone" href={`tel:${phone.replace(/\s/g, '')}`}>
              <IcoPhone /> {phone}
            </a>
            <div className="contact__sm">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact__sm-l">
                  <Icon size={16} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact__ctas">
            <BookButton type="button" className="btn btn--primary btn--lg">
              {t('bookBtn')}
            </BookButton>
          </div>
        </div>

        <div className="contact__map">
          <MapMock />
        </div>
      </div>
    </section>
  );
}
