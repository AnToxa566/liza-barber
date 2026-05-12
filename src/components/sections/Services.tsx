import { useTranslations } from 'next-intl';
import { Placeholder } from '@/components/ui/Placeholder';
import { BookButton } from '@/components/ui/BookButton';

type Tone = 'light' | 'mid' | 'dark' | 'warm';
type Kind = 'portrait' | 'scissors' | 'comb' | 'razor' | 'studio' | 'beard';

const SVC_KINDS: Kind[] = ['scissors', 'beard', 'razor', 'comb', 'razor', 'studio'];
const SVC_TONES: Tone[] = ['light', 'warm', 'mid', 'light', 'dark', 'warm'];

function IcoClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{
    name: string;
    price: string;
    duration: string;
    desc: string;
  }>;

  return (
    <section id="services" className="sec sec--services">
      <div className="container">
        <header className="sec__head">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
          <p className="sec__sub">{t('sub')}</p>
        </header>

        <div className="svc__grid svc__grid--photo">
          {items.map((svc, i) => (
            <article key={i} className="svc-card svc-card--photo">
              <div className="svc-card__media">
                <Placeholder
                  kind={SVC_KINDS[i % SVC_KINDS.length]}
                  tone={SVC_TONES[i % SVC_TONES.length]}
                  caption={`Service · ${String(i + 1).padStart(2, '0')}`}
                  style={{ width: '100%', aspectRatio: '4/3' }}
                />
              </div>
              <div className="svc-card__body">
                <div className="svc-card__topline">
                  <h3 className="h3">{svc.name}</h3>
                  <span className="svc-card__price">{svc.price}</span>
                </div>
                <div className="svc-card__meta"><IcoClock /> {svc.duration}</div>
                <p className="svc-card__desc">{svc.desc}</p>
                <BookButton type="button" className="btn btn--outline">
                  {t('bookThis')}
                </BookButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
