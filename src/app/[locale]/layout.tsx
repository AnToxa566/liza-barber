import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PHONE } from '@/config/contact';

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
  };
}

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eliza Baidak',
  jobTitle: 'Barber',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Varna',
    addressCountry: 'BG',
  },
};

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
  const LOCAL_BUSINESS_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Eliza Baidak — Barber',
    image: '',
    url: 'https://lizabarber.bg',
    telephone: PHONE.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: tContact('street'),
      addressLocality: 'Varna',
      addressCountry: 'BG',
    },
    openingHours: 'Sun-Thu 10:00-20:00',
    priceRange: '30–80 BGN',
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
    </NextIntlClientProvider>
  );
}
