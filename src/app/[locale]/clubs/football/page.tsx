import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ClubPageTemplate from '@/components/clubs/ClubPageTemplate';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'clubs.football' });
  return { title: t('title') };
}

export default async function FootballPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'clubs.football' });

  return (
    <ClubPageTemplate
      locale={locale}
      image="/football.png"
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      accent="#5A8A2E"
      joinCta={t('join_cta')}
      stats={[
        { n: '312', label: 'MEMBRES' },
        { n: '6', label: 'ÉQUIPES' },
        { n: '18', label: 'MATCHS / SAISON' },
        { n: '79%', label: 'VICTOIRES' },
      ]}
      teams={['1ère équipe', '2ème équipe', 'Juniors A', 'Juniors B', 'U13', 'Vétérans']}
      nextMatch={{
        home: 'KSV PALLASTRADA',
        away: 'SC BERNE II',
        date: '14 MAI 2026',
        time: '18:30',
      }}
    />
  );
}
