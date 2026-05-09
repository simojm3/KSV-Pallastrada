import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ClubPageTemplate from '@/components/clubs/ClubPageTemplate';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'clubs.velo' });
  return { title: t('title') };
}

export default async function VeloPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'clubs.velo' });

  return (
    <ClubPageTemplate
      locale={locale}
      image="/cycling.jpg"
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      accent="#C24A2C"
      joinCta={t('join_cta')}
      stats={[
        { n: '68', label: 'MEMBRES' },
        { n: '4', label: 'GROUPES' },
        { n: '120+', label: 'KM / SORTIE' },
        { n: '52', label: 'SORTIES / AN' },
      ]}
      teams={['Élite Route', 'Gravel Club', 'VTT Découverte', 'Cyclo-tourisme']}
    />
  );
}
