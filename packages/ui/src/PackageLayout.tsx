// packages/ui/src/PackageLayout.tsx
'use client';
//@ts-ignore
import '@repo/styles';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { LOGO } from '../constants/logo';
import { motion } from 'framer-motion';

export function PackageLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          background: scrolled
            ? 'linear-gradient(180deg, #1A0F0A 0%, #1A0F0A 40%, rgba(26,15,10,0.9) 70%, rgba(26,15,10,0.6) 100%)'
            : 'linear-gradient(180deg, #1A0F0A 0%, #1A0F0A 50%, rgba(26,15,10,0.95) 75%, rgba(26,15,10,0.7) 100%)',
          backdropFilter: 'blur(20px) saturate(130%)',
          WebkitBackdropFilter: 'blur(20px) saturate(130%)',
          boxShadow: scrolled
            ? `
              inset 0 1px 0 rgba(245, 230, 200, 0.4),
              inset 0 -1px 0 rgba(0, 0, 0, 0.6),
              0 12px 40px rgba(0, 0, 0, 0.8),
              0 4px 16px rgba(0, 0, 0, 0.6),
              0 0 80px rgba(212, 175, 55, 0.08)
            `
            : `
              inset 0 1px 0 rgba(245, 230, 200, 0.5),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 10px 32px rgba(0, 0, 0, 0.7),
              0 3px 12px rgba(0, 0, 0, 0.5),
              0 0 100px rgba(212, 175, 55, 0.1)
            `,
        }}
      >
        {/* 1. ЯРКИЙ БЛИК СВЕРХУ — 3px, заметный */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent 3%, rgba(245, 230, 200, 0.4) 15%, rgba(255, 245, 220, 0.95) 50%, rgba(245, 230, 200, 0.4) 85%, transparent 97%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* 2. МЯГКОЕ СВЕЧЕНИЕ ПОД БЛИКОМ — заметное */}
        <div
          className="absolute top-0 left-0 right-0 h-[24px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(245, 230, 200, 0.2) 0%, transparent 100%)',
          }}
        />

        {/* 3. АНИМИРОВАННАЯ ВОЛНА СВЕТА — медленно скользит, заметно */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255, 245, 220, 0.9), transparent)',
            filter: 'blur(2px)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />

        {/* 4. ТЁПЛОЕ СВЕЧЕНИЕ СНИЗУ — панель «светится» */}
        <div
          className="absolute bottom-0 left-[20%] right-[20%] h-[30px] pointer-events-none -mb-[15px]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* 5. ТОНКАЯ ЗОЛОТАЯ ЛИНИЯ СНИЗУ — заметная */}
        <div
          className="absolute bottom-0 left-[8%] right-[8%] h-[1px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5) 50%, transparent)',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.4)',
          }}
        />

        <div className="container mx-auto px-4 py-2 flex items-center gap-4">
          {/* Лого — с аккуратным золотым свечением */}
          <div
            className="logo-hover flex-shrink-0"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
            }}
          >
            <Logo
              src={LOGO.SRC}
              alt={LOGO.ALT}
              width={LOGO.WIDTH}
              height={LOGO.HEIGHT}
            />
          </div>

          {/* Слоган */}
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-gold/70">
              Ваш надежный партнер в комплектации
            </span>
            <span className="text-[9px] sm:text-[10px] font-light text-gold/40 tracking-wide">
              Для ООО &quot;Специализированный застройщик &quot;ИСКРА&quot;
            </span>
          </div>
        </div>
      </header>

      <main className="pt-[60px] min-h-screen">{children}</main>

      <footer className="chocolate-footer py-3 text-center">
        <div className="text-gold/80 text-xs font-medium tracking-wide">
          © 2026 GLORITER — все права защищены
        </div>
      </footer>
    </div>
  );
}