import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KSV Pallastrada',
    template: '%s | KSV Pallastrada',
  },
};

// html/body are rendered in [locale]/layout.tsx so the lang attribute
// can be set per locale. Next.js supports this pattern for i18n apps.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as unknown as React.ReactElement;
}
