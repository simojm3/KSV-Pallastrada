import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  locale: string;
}

const columns = [
  {
    title: 'CLUBS',
    links: [
      { label: 'Football', href: '/clubs/football' },
      { label: 'Vélo', href: '/clubs/velo' },
      { label: 'Hiking', href: '/clubs/hiking' },
      { label: 'Adhésion', href: '/contact' },
    ],
  },
  {
    title: 'TOURNOI',
    links: [
      { label: 'Calendrier', href: '/tournoi' },
      { label: 'Classements', href: '/tournoi' },
      { label: 'Diffusion', href: '/tournoi' },
      { label: 'Archives', href: '/tournoi' },
    ],
  },
  {
    title: 'ASSOCIATION',
    links: [
      { label: 'À propos', href: '/' },
      { label: 'Comité', href: '/' },
      { label: 'Sponsors', href: '/' },
      { label: 'Presse', href: '/' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { label: 'Berne, CH', href: '/contact' },
      { label: '+41 31 555 0147', href: '/contact' },
      { label: 'hello@ksv-pallastrada.ch', href: '/contact' },
    ],
  },
];

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-navy text-paper px-5 pt-14 pb-7 sm:px-14 sm:pt-14 sm:pb-7">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
        {/* Brand col */}
        <div>
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="KSV Pallastrada" width={36} height={36} className="rounded-full" />
            <div className="leading-none font-display">
              <div className="text-lg tracking-[0.04em]">KSV</div>
              <div className="text-[13px] tracking-[0.18em] mt-0.5 opacity-70">PALLASTRADA</div>
            </div>
          </Link>
          <p className="mt-4 text-[13px] leading-relaxed opacity-65 max-w-[280px] font-sans">
            Association sportive bernoise depuis 1947. Football, vélo, randonnée — unis par le sport, engagés pour demain.
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <div className="font-display text-[13px] tracking-[0.18em] mb-4 opacity-60">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-[13px] opacity-85 hover:opacity-100 transition-opacity font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex justify-between items-center pt-6 text-[11px] font-mono tracking-[0.1em] opacity-55"
        style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}
      >
        <span>© 2026 KSV PALLASTRADA · BERNE</span>
        <span>SPORT · NATURE · COMMUNAUTÉ</span>
      </div>
    </footer>
  );
}
