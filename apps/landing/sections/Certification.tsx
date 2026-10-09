// apps/landing/sections/Certification.tsx
'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';
import { useEffect, useRef } from 'react';

export function Certification() {
  const controls = useAnimationControls();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.7 });

  const points = [
    { icon: '', title: 'Пожарные сертификаты', desc: '' },
    { icon: '', title: 'Протоколы испытаний', desc: '' },
    { icon: '', title: 'Соответствие ГОСТ РФ', desc: '' },
    { icon: '', title: 'Необходимую техническую документацию', desc: '' },
  ];

  // GLORITER — появляется с scale 1.2 → 1
  useEffect(() => {
    if (!isInView) return;
    controls.start('visible');
  }, [controls, isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-chocolate-darkest"
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Лёгкий blur */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-black/5" />

{/* Затемнение — только снизу, как в Hero */}
<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1A0F0A]/90 via-[#1A0F0A]/40 to-transparent pointer-events-none" />
      {/* Плавающие сияющие круги */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-[#D4C5A9]/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-80 h-80 bg-[#D4C5A9]/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4C5A9]/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
      />

      {/* ============================================ */}
      {/* Заглушка GLORITER — адаптивный размер и позиция */}
      {/* ============================================ */}
<motion.div
  className="absolute inset-0 z-10 flex items-start justify-center overflow-hidden pointer-events-none pt-[120px] sm:pt-[160px] md:pt-[220px]"
  initial="initial"
  animate={controls}
  variants={{
    initial: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 2.5, ease: 'easeOut' },
    },
  }}
>
  <span
    className="font-heading font-bold tracking-[0.2em] md:tracking-[0.35em] select-none text-[36px] sm:text-[72px] md:text-[120px]"
    style={{
      background: 'linear-gradient(180deg, #F5E6C8 0%, #D4C5A9 40%, #A67B5B 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: `drop-shadow(0 0 20px rgba(212, 197, 169, 0.5)) drop-shadow(0 0 40px rgba(212, 197, 169, 0.3)) drop-shadow(0 0 80px rgba(166, 123, 91, 0.2))`,
    }}
  >
    GLORITER
  </span>
</motion.div>

      {/* ============================================ */}
      {/* Контент — внизу */}
      {/* ============================================ */}
      <div className="relative z-20 w-full max-w-6xl px-4 pb-12 md:pb-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-heading text-white drop-shadow-[0_0_40px_rgba(212,197,169,0.3)]">
            Гарантия качества
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/90 text-lg md:text-xl font-light tracking-wide drop-shadow-[0_0_30px_rgba(212,197,169,0.2)]">
            Все материалы соответствуют требованиям РФ
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/90 text-lg md:text-xl font-light tracking-wide drop-shadow-[0_0_30px_rgba(212,197,169,0.2)]">
            Мы предоставляем:{' '}
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {points.map((point, idx) => (
            <Reveal key={idx} delay={0.1 * (idx + 1)}>
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,197,169,0.15)] transition-all duration-300 hover:scale-105 hover:bg-white/15"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                }}
              >
                <div className="text-4xl md:text-5xl">{point.icon}</div>
                <div className="mt-1 text-white/90 text-sm md:text-base font-heading">
                  {point.title}
                </div>
                <div className="mt-0.5 text-[#D4C5A9]/60 text-[10px] md:text-xs leading-tight">
                  {point.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Бейдж */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 text-[#D4C5A9]/30 text-[10px] tracking-widest bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-[0_0_20px_rgba(212,197,169,0.1)]"
      >
        <span>ГОСТ</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>ТР ТС</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>Пожарная безопасность</span>
      </motion.div>
    </section>
  );
}