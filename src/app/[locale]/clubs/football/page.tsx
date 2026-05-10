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
      ctaLine1={t('cta_line1')}
      ctaLine2={t('cta_line2')}
      aboutLabel={t('about_label')}
      teamsLabel={t('teams_label')}
      nextMatchLabel={t('next_match_label')}
      stats={[
        { n: '42', label: t('stat_members') },
        { n: '2', label: t('stat_teams') },
      ]}
      teams={['1ère équipe', '2ème équipe']}
      nextMatch={{
        home: 'KSV PALLASTRADA',
        away: 'TOURNOI 2026',
        date: '7 JUIN 2026',
      }}
    />
  );
}
