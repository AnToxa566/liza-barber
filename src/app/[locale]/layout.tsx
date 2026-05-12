import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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

const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Eliza Baidak — Barber',
  image: '',
  url: 'https://lizabarber.bg',
  telephone: '+359884129031',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Knyaz Boris I 47',
    addressLocality: 'Varna',
    addressCountry: 'BG',
  },
  openingHours: 'Tu-Sa 10:00-20:00',
  priceRange: '30–80 BGN',
};

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
