'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormData = { name: '', email: '', subject: '', message: '' };

const SUBJECT_PILLS = ['Adhésion', 'Football', 'Vélo', 'Hiking', 'Tournoi', 'Presse', 'Autre'];

const inputBase: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: '#FAF6EC',
  border: '1px solid #E3DCCB',
  padding: '14px 16px',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 14,
  color: '#0A0F18',
  outline: 'none',
  borderRadius: 0,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: '#5C6577',
          marginBottom: 8,
        }}
      >
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState<FormData>({ ...empty, subject: 'Autre' });
  const [subjectPill, setSubjectPill] = useState('Autre');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePill = (pill: string) => {
    setSubjectPill(pill);
    setForm((prev) => ({ ...prev, subject: pill }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState('success');
      setForm(empty);
      setSubjectPill('');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div
        className="p-10 text-center"
        style={{ background: '#F0FBE8', border: '1px solid #5A8A2E' }}
      >
        <div className="font-display text-navy mb-2" style={{ fontSize: 48 }}>ENVOYÉ!</div>
        <p className="font-sans text-[15px] text-stone mb-6">{t('success_text')}</p>
        <button
          onClick={() => setState('idle')}
          className="font-mono text-[11px] tracking-[0.16em] text-navy underline"
        >
          ← ENVOYER UN AUTRE MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {state === 'error' && (
        <div
          className="px-4 py-3 font-sans text-sm"
          style={{ background: '#FEF2F0', border: '1px solid #C24A2C', color: '#C24A2C' }}
        >
          {t('error_text')}
        </div>
      )}

      {/* Subject pills */}
      <Field label={t('form_subject')}>
        <div className="flex flex-wrap gap-2 mt-1">
          {SUBJECT_PILLS.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => handlePill(pill)}
              className="font-mono text-[11px] tracking-[0.1em] px-3 py-2 transition-colors"
              style={{
                background: subjectPill === pill ? '#0E2A4A' : 'transparent',
                color: subjectPill === pill ? '#FAF6EC' : '#5C6577',
                border: `1px solid ${subjectPill === pill ? '#0E2A4A' : '#E3DCCB'}`,
                borderRadius: 0,
              }}
            >
              {pill.toUpperCase()}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label={t('form_name')}>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            style={inputBase}
          />
        </Field>
        <Field label={t('form_email')}>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jean@exemple.ch"
            style={inputBase}
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          name="message"
          required
          rows={7}
          value={form.message}
          onChange={handleChange}
          placeholder={t('form_message')}
          style={{ ...inputBase, resize: 'none' }}
        />
      </Field>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="self-start font-mono text-[13px] font-bold tracking-[0.12em] px-8 py-4 bg-navy text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        style={{ borderRadius: 0 }}
      >
        {state === 'loading' ? 'ENVOI EN COURS...' : t('form_submit').toUpperCase() + ' →'}
      </button>
    </form>
  );
}
