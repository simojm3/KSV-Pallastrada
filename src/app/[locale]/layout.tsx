import type { Metadata } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const BASE_URL = 'https://ksv-pallastrada.ch';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const descriptions: Record<string, string> = {
  fr: 'Association sportive bernoise depuis 2019 — Football, Vélo, Randonnée. Suivez le tournoi en direct.',
  en: 'Bernese sports association since 2019 — Football, Cycling, Hiking. Follow the tournament live.',
  de: 'Bernischer Sportverein seit 2019 — Fussball, Velo, Wandern. Turnier live verfolgen.',
  it: 'Associazione sportiva bernese dal 2019 — Calcio, Ciclismo, Escursionismo. Segui il torneo in diretta.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'KSV Pallastrada',
      template: '%s | KSV Pallastrada',
    },
    description,
    keywords: ['KSV Pallastrada', 'football Berne', 'vélo Berne', 'randonnée Berne', 'association sportive Berne', 'tournoi football'],
    authors: [{ name: 'KSV Pallastrada' }],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        de: `${BASE_URL}/de`,
        it: `${BASE_URL}/it`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'KSV Pallastrada',
      locale,
      url: `${BASE_URL}/${locale}`,
      title: 'KSV Pallastrada',
      description,
      images: [{ url: `${BASE_URL}/logo.png`, width: 512, height: 512, alt: 'KSV Pallastrada' }],
    },
    twitter: {
      card: 'summary',
      title: 'KSV Pallastrada',
      description,
    },
    robots: { index: true, follow: true },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'KSV Pallastrada',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hochfeldstrasse 65',
    addressLocality: 'Bern',
    postalCode: '3012',
    addressCountry: 'CH',
  },
  email: 'contact@ksv-pallastrada.ch',
  sport: ['Football', 'Cycling', 'Hiking'],
  memberOf: { '@type': 'Organization', name: 'Association sportive bernoise' },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink flex flex-col min-h-screen font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
