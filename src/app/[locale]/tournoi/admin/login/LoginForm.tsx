'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: '#06101F',
  border: '1px solid rgba(250,246,236,0.1)',
  padding: '14px 16px',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 14,
  color: '#FAF6EC',
  outline: 'none',
  borderRadius: 0,
};

export default function LoginForm({ locale }: { locale: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: data.get('email') as string,
      password: data.get('password') as string,
      redirect: false,
    });

    if (result?.error) {
      setError(true);
      setLoading(false);
    } else {
      window.location.replace(`/${locale}/tournoi/admin`);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {error && (
        <div
          className="px-4 py-3 font-sans text-sm"
          style={{ background: 'rgba(194,74,44,0.1)', border: '1px solid rgba(194,74,44,0.4)', color: '#C24A2C' }}
        >
          Invalid credentials. Please try again.
        </div>
      )}

      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>
          EMAIL
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="admin@association.ch"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] mb-2" style={{ color: 'rgba(166,173,185,0.5)' }}>
          PASSWORD
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="font-mono text-[13px] font-bold tracking-[0.12em] py-4 bg-navy text-paper transition-opacity hover:opacity-85 disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ borderRadius: 0 }}
      >
        {loading ? 'SIGNING IN...' : 'SIGN IN'}
      </button>
    </form>
  );
}
