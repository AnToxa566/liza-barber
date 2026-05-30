import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { DEFAULT_LOCALE } from '@/config/locales';
import { SITE_URL } from '@/config/site';
import './globals.css';

const oswald = Oswald({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? DEFAULT_LOCALE;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    openGraph: {
      locale,
      url: SITE_URL,
      type: 'website',
      siteName: 'Eliza Barber',
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og.jpg' }],
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
      images: ['/og.jpg'],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
