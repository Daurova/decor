// apps/landing/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';

export function Hero() {
  return (
    <section 
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
      {/* Фоновое изображение с анимацией масштабирования (один раз) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://placehold.co/1920x1080/3E2C1B/a48159?text=GLORITER')",
          backgroundColor: '#3E2C1B',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: 'easeOut',
        }}
      />
      
      {/* Затемнение */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D1F14]/80 via-[#3E2C1B]/50 to-transparent" />

      {/* Контент — прижат к низу */}
      <div className="relative z-10 w-full max-w-xl px-6 pb-8 md:pb-10 text-center">
        <Reveal>
          <h1 className="text-2xl md:text-4xl font-heading text-white drop-shadow-lg leading-tight">
            Один поставщик — <br />
            <span className="text-[#D4C5A9] drop-shadow-[0_0_30px_rgba(212,197,169,0.15)]">
              полная готовность
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/60 text-xs md:text-sm font-light tracking-wide max-w-lg leading-relaxed mx-auto">
            Отделочные материалы, фасады, освещение, сантехника.
            <br />
            Всё под ключ для застройщика.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-3 px-5 py-2 rounded-full bg-[#A67B5B] text-white font-medium text-xs md:text-sm shadow-lg shadow-black/20 transition-all duration-300"
          >
            Запросить коммерческое предложение
          </motion.button>
        </Reveal>
      </div>

      {/* Бейдж */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 mb-4 flex gap-3 text-[#D4C5A9]/20 text-[10px] tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full"
      >
        <span>РФ</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>100+ объектов</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>8+ лет</span>
      </motion.div>
    </section>
  );
}