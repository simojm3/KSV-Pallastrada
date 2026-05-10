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
                Hochfeldstrasse 65<br />
                3012 Bern
              </address>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-stone-l mb-3">
                  {t('training_title').toUpperCase()}
                </p>
                <p className="font-sans text-[13px] text-paper opacity-70">
                  {t('training_schedule')}
                </p>
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-stone-l mb-3">
                  {t('email_title').toUpperCase()}
                </p>
                <a
                  href="mailto:contact@ksv-pallastrada.ch"
                  className="font-sans text-[13px] text-paper opacity-70 hover:opacity-100 transition-opacity"
                >
                  contact@ksv-pallastrada.ch
                </a>
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
                <span className="font-mono text-[10px] tracking-[0.16em] text-stone-l">HOCHFELDSTRASSE 65 · 3012 BERN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Direct contact strip ─── */}
      <section className="bg-navy px-5 py-14 sm:px-14 sm:py-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-stone-l mb-10">{t('direct_contacts')}</p>
        <div className="flex flex-col sm:flex-row gap-0.5">
          <div
            className="p-8 bg-navy-deep flex flex-col gap-3"
            style={{ borderTop: '3px solid #5A8A2E' }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em]" style={{ color: '#5A8A2E' }}>KSV PALLASTRADA</p>
            <p className="font-display text-paper" style={{ fontSize: 28 }}>ASSOCIATION</p>
            <a
              href="mailto:contact@ksv-pallastrada.ch"
              className="font-sans text-[13px] text-stone-l hover:text-paper transition-colors"
            >
              contact@ksv-pallastrada.ch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
