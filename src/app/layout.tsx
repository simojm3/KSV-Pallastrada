import type { Metadata } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'KSV Pallastrada',
    template: '%s | KSV Pallastrada',
  },
  description: 'Association sportive — Football, Vélo, Randonnée',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-paper text-ink flex flex-col min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
