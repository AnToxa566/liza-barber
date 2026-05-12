import { setRequestLocale } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { Reviews } from '@/components/sections/Reviews';
import { About } from '@/components/sections/About';
import { CtaSection } from '@/components/sections/CtaSection';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Work />
      <Reviews />
      <About />
      <CtaSection />
      <FAQ />
      <Contact />
    </>
  );
}
