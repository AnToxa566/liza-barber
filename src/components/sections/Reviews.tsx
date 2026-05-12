import { useTranslations } from 'next-intl';

export function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Array<{
    text: string;
    name: string;
    source: string;
    stars: number;
  }>;

  function initials(name: string) {
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  }

  return (
    <section id="reviews" className="sec sec--reviews">
      <div className="container">
        <header className="sec__head sec__head--row">
          <div>
            <span className="kicker">{t('kicker')}</span>
            <h2 className="h2">{t('title')}</h2>
          </div>
          <p className="sec__sub sec__sub--right">{t('sub')}</p>
        </header>

        <div className="rev__row" role="list">
          {items.map((r, i) => (
            <article key={i} className="rev-card" role="listitem">
              <div className="rev-card__stars" aria-label={`${r.stars} stars`}>
                {'★'.repeat(r.stars)}
              </div>
              <p className="rev-card__text">&ldquo;{r.text}&rdquo;</p>
              <footer className="rev-card__foot">
                <span className="rev-card__avatar" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <div className="rev-card__who">
                  <span className="rev-card__name">{r.name}</span>
                  <span className="rev-card__src">via {r.source}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
