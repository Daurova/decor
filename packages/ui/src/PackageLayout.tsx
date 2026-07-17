// packages/ui/src/PackageLayout.tsx
'use client';
//@ts-ignore
import '@repo/styles';
import { Logo } from './Logo';
import Link from 'next/link';

export function PackageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Хедер — абсолютный поверх контента */}
      <header className="absolute top-0 left-0 right-0 z-50 chocolate-header">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
          <div className="flex flex-col items-start logo-hover">
            <div className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <Logo />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-gold/70 font-light mt-0.5">
              Один поставщик застройщика
            </span>
          </div>
          <nav className="flex gap-2 sm:gap-4 whitespace-nowrap">
            <Link href="/about" className="nav-link text-gold/80 hover:text-white font-heading text-sm sm:text-base transition-colors duration-300">
              О нас
            </Link>
            <Link href="/catalogue" className="nav-link text-gold/80 hover:text-white font-heading text-sm sm:text-base transition-colors duration-300">
              Каталог
            </Link>
            <Link href="/designers" className="nav-link text-gold/80 hover:text-white font-heading text-sm sm:text-base transition-colors duration-300">
              Дизайнерам
            </Link>
          </nav>
        </div>
      </header>

      {/* Основной контент — занимает весь экран */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Футер — абсолютный снизу */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 chocolate-footer py-4 text-center">
        <div className="relative z-10 text-gold/80 text-sm font-medium tracking-wide">
          © 2026 GLORITER — все права защищены
        </div>
      </footer>
    </div>
  );
}