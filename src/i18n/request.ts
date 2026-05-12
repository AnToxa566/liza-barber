import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const enMessages = (await import(`../../messages/en.json`)).default;
  if (locale === 'en') {
    return { locale, messages: enMessages };
  }

  const localeMessages = await import(`../../messages/${locale}.json`)
    .then((m) => m.default)
    .catch(() => ({}));

  return {
    locale,
    messages: { ...enMessages, ...localeMessages },
  };
});
