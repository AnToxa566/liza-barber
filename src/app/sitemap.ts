import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/site';
import { DEFAULT_LOCALE, locales } from '@/config/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
  );

  return [
    {
      url: `${SITE_URL}/${DEFAULT_LOCALE}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ...languages,
          'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`,
        },
      },
    },
  ];
}
