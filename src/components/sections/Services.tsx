import { useTranslations } from 'next-intl';
import { ServicesTabs, type Category } from './ServicesTabs';
import { SERVICES_DATA } from '@/config/services';
import { ALTEGIO_SELECT_TIME_URL } from '@/config/booking';
import { formatDuration } from '@/lib/formatDuration';

export function Services() {
  const t = useTranslations('services');

  const rawItems = t.raw('items') as Array<{ title: string; items: Array<{ name: string; desc: string }> }>;
  const categories: Category[] = rawItems.map((cat, ci) => ({
    id: cat.title.toLowerCase().replace(/\s+/g, '-'),
    label: cat.title,
    items: cat.items.map((item, ii) => ({
      name: item.name,
      desc: item.desc,
      price: `${SERVICES_DATA[ci].items[ii].price}€`,
      bookingUrl: `${ALTEGIO_SELECT_TIME_URL}s${SERVICES_DATA[ci].items[ii].altegio_id}`,
      duration: formatDuration(SERVICES_DATA[ci].items[ii].duration, (key) => t(key as Parameters<typeof t>[0])),
    })),
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
