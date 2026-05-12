import { useTranslations } from 'next-intl';
import { Placeholder } from '@/components/ui/Placeholder';

export function About() {
  const t = useTranslations('about');
  const pills = t.raw('pills') as string[];
  const whyMe = t.raw('whyMe') as Array<{ title: string; desc: string }>;

  return (
    <section id="about" className="sec sec--about">
      <div className="container about__grid">
        <div className="about__photo">
          <Placeholder kind="portrait" tone="dark" caption="Eliza · at work · candid" tag="A · 01"
            style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="about__text">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
          <p className="about__p">{t('p1')}</p>
          <p className="about__p">{t('p2')}</p>
          <p className="about__p">{t('p3')}</p>

          <div className="about__pills">
            {pills.map((pill) => (
              <span key={pill} className="pill">{pill}</span>
            ))}
          </div>

          <ul className="about__why">
            {whyMe.map((item, i) => (
              <li key={i}>
                <span className="about__why-k">0{i + 1}</span>
                <div>
                  <h4 className="about__why-t">{item.title}</h4>
                  <p className="about__why-d">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
