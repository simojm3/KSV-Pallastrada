import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  const contacts = [
    {
      role: 'SECRÉTARIAT',
      name: 'Marie Schneider',
      email: 'secretariat@ksv-pallastrada.ch',
      phone: '+41 31 555 0147',
      accent: '#5A8A2E',
    },
    {
      role: 'FOOTBALL',
      name: 'Stefan Müller',
      email: 'football@ksv-pallastrada.ch',
      phone: '+41 79 123 4567',
      accent: '#E8A23C',
    },
    {
      role: 'VÉLO / HIKING',
      name: 'Lucie Bernard',
      email: 'clubs@ksv-pallastrada.ch',
      phone: '+41 79 234 5678',
      accent: '#7FA8C9',
    },
  ];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-paper px-5 pt-14 pb-10 sm:px-14 sm:pt-20 sm:pb-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-stone mb-6">CONTACT</p>
        <h1
          className="font-display text-navy leading-none"
          style={{ fontSize: 'clamp(48px, 10vw, 168px)', maxWidth: 900 }}
        >
          {t('title').toUpperCase()},<br />
          <span style={{ color: '#5C6577' }}>{t('subtitle').toUpperCase()}.</span>
        </h1>
      </section>

      {/* ─── Form + Info ─── */}
      <section className="bg-paper px-5 pb-14 sm:px-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form (2 cols) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-6">
            {/* Address card */}
            <div className="bg-navy p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-stone-l mb-5">
                {t('address_title').toUpperCase()}
              </p>
              <address className="not-italic font-sans text-[14px] leading-loose text-paper opacity-80">
                KSV Pallastrada<br />
                Route du Stade 14<br />
                3000 Berne, Suisse
              </address>
              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-stone-l mb-3">
                  {t('phone_title').toUpperCase()}
                </p>
                <div className="flex flex-col gap-1.5 font-sans text-[13px] text-paper opacity-70">
                  <div className="flex justify-between"><span>Lun–Ven</span><span>09:00–17:00</span></div>
                  <div className="flex justify-between"><span>Sam</span><span>09:00–12:00</span></div>
                  <div className="flex justify-between"><span>Dim</span><span>Fermé</span></div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="relative"
              style={{
                height: 200,
                background: '#0E2A4A',
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(250,246,236,0.04) 0, rgba(250,246,236,0.04) 1px, transparent 0, transparent 32px), repeating-linear-gradient(90deg, rgba(250,246,236,0.04) 0, rgba(250,246,236,0.04) 1px, transparent 0, transparent 32px)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] tracking-[0.16em] text-stone-l">CARTE · BERNE CH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contacts strip ─── */}
      <section className="bg-navy px-5 py-14 sm:px-14 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-stone-l mb-10">CONTACTS DIRECTS</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {contacts.map((c) => (
            <div
              key={c.role}
              className="p-8 bg-navy-deep flex flex-col gap-3"
              style={{ borderTop: `3px solid ${c.accent}` }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: c.accent }}>{c.role}</p>
              <p className="font-display text-paper" style={{ fontSize: 28 }}>{c.name.toUpperCase()}</p>
              <a href={`mailto:${c.email}`} className="font-sans text-[13px] text-stone-l hover:text-paper transition-colors">{c.email}</a>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-mono text-[12px] tracking-[0.1em] text-stone-l hover:text-paper transition-colors">{c.phone}</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
