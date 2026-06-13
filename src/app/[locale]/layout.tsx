import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PHONE } from '@/config/contact';
import { SITE_URL } from '@/config/site';

const OG_LOCALE: Record<string, string> = {
  bg: 'bg_BG',
  en: 'en_US',
  ru: 'ru_RU',
  uk: 'uk_UA',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Eliza Barber',
      title: t('title'),
      description: t('description'),
      images: [{ url: `${SITE_URL}/images/hero.jpg` }],
      locale: OG_LOCALE[locale] ?? locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${SITE_URL}/images/hero.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tContact = await getTranslations({ locale, namespace: 'contact' });

  const PERSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eliza Baidak',
    jobTitle: 'Barber',
    address: {
      '@type': 'PostalAddress',
      addressLocality: tContact('city'),
      addressCountry: tContact('country'),
    },
  };

  const LOCAL_BUSINESS_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Eliza Baidak — Barber',
    image: `${SITE_URL}/images/hero.jpg`,
    url: SITE_URL,
    telephone: PHONE.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: tContact('street'),
      addressLocality: tContact('city'),
      addressCountry: tContact('country'),
    },
    openingHours: ['Su 10:00-19:00', 'Mo 10:00-20:00', 'Tu 10:00-20:00', 'We 10:00-20:00', 'Th 10:00-20:00'],
    priceRange: '€10–€45',
  };

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />

      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
