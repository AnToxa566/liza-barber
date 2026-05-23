import { useTranslations } from 'next-intl';
import { ServicesTabs, type Category } from './ServicesTabs';

export function Services() {
  const t = useTranslations('services');

  const rawItems = t.raw('items') as Array<{ title: string; items: Category['items'] }>;
  const categories: Category[] = rawItems.map((cat) => ({
    id: cat.title.toLowerCase().replace(/\s+/g, '-'),
    label: cat.title,
    items: cat.items,
  }));

  return (
    <section id="services" className="sec sec--services">
      <div className="container">
        <header className="sec__head">
          <span className="kicker">{t('kicker')}</span>
          <h2 className="h2">{t('title')}</h2>
          <p className="sec__sub">{t('sub')}</p>
        </header>

        <ServicesTabs categories={categories} bookThis={t('bookThis')} />
      </div>
    </section>
  );
}
