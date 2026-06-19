import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/site';
import { DEFAULT_LOCALE, locales } from '@/config/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
  );

  const alternates = {
    languages: {
      ...languages,
      'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`,
    },
  };

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates,
  }));
}
