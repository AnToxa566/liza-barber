import { useTranslations } from 'next-intl';

export function TrustBar() {
  const t = useTranslations();
  const items = t.raw('trust') as Array<{ n: string; l: string }>;

  return (
    <section className="trust" aria-label="Trust indicators">
      <div className="container trust__row">
        {items.map((item, i) => (
          <div key={i} className="trust__cell">
            <span className="trust__n">{item.n}</span>
            <span className="trust__l">{item.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
