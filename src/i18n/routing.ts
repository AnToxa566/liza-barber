import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'en', 'ru', 'uk', 'tr'],
  defaultLocale: 'bg',
});

export type Locale = (typeof routing.locales)[number];
