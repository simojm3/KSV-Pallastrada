import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ClubPageTemplate from '@/components/clubs/ClubPageTemplate';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'clubs.hiking' });
  return { title: t('title') };
}

export default async function HikingPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'clubs.hiking' });

  return (
    <ClubPageTemplate
      locale={locale}
      image="/hiking.jpg"
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      accent="#7FA8C9"
      joinCta={t('join_cta')}
      stats={[
        { n: '32', label: 'MEMBRES' },
        { n: '12', label: 'SORTIES / AN' },
        { n: '850m', label: 'D+ MOYEN' },
        { n: '2', label: 'NIVEAUX' },
      ]}
      teams={['Randonneurs experts', 'Promeneurs familiaux']}
    />
  );
}
