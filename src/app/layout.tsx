import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Barber in Varna — Eliza Baidak',
  description: 'Haircuts, beard shaping and care in Varna. Book online — no waiting.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'bg';

  return (
    <html lang={locale} className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
