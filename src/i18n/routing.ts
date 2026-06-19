import { defineRouting } from 'next-intl/routing';
import { locales, DEFAULT_LOCALE } from '@/config/locales';

export const routing = defineRouting({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
