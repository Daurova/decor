// apps/landing/sections/Assortment.tsx
'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// === 4 фото для коллажа ===
const collagePhotos = [
  { src: '/images/photos/photo4.jpg', alt: 'GLORITER — коллаж 1' },
  { src: '/images/photos/photo5.jpg', alt: 'GLORITER — коллаж 2' },
  { src: '/images/photos/photo6.jpg', alt: 'GLORITER — коллаж 3' },
  { src: '/images/photos/photo7.jpg', alt: 'GLORITER — коллаж 4' },
];

export function Assortment() {
  const controls = useAnimationControls();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.7 });

  const [collageOpen, setCollageOpen] = useState(false);

  const categories = [
    { icon: '', name: 'Фасады', desc: '' },
    { icon: '', name: 'Внутренняя отделка', desc: '' },
    { icon: '', name: 'Освещение', desc: '' },
    { icon: '', name: 'Оборудование территории', desc: '' },
    { icon: '', name: 'Ландшафт', desc: '' },
    { icon: '', name: '?', desc: '' },
  ];

  // GLORITER — запускается только при появлении секции в окне
  useEffect(() => {
    if (!isInView) return;
    const run = async () => {
      await controls.start('visible');
      await controls.start('strip');
    };
    run();
  }, [controls, isInView]);

  // Коллаж — авто-раскрытие через 1.5 сек после появления в стопке
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      setCollageOpen(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, [isInView]);

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

      {/* Затемнение снизу вверх */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D1F14]/90 via-[#2D1F14]/20 to-transparent" />

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

      {/* ============================================ */}
      {/* КОЛЛАЖ ИЗ 4 ФОТО */}
      {/* Сначала появляются в стопке → пауза → раскрываются в линию */}
      {/* ============================================ */}
      <div
        className="absolute z-[1] left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{
          top: '300px',
          perspective: '1200px',
        }}
      >
        {collagePhotos.map((photo, index) => {
          // Состояние стопки
          const stackedX = index * 24 - 36;
          const stackedRotate = (index - 1.5) * 4;
          const stackedY = index * 4;

          // Состояние линии (раскрытое) — увеличено расстояние
          const openX = (index - 1.5) * 220;
          const openRotate = 0;
          const openY = 0;

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
                x: stackedX,
                rotate: stackedRotate,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: collageOpen ? openY : stackedY,
                      x: collageOpen ? openX : stackedX,
                      rotate: collageOpen ? openRotate : stackedRotate,
                      scale: collageOpen ? 1.05 : 1,
                      zIndex: collageOpen ? index : 4 - index,
                    }
                  : {}
              }
              transition={{
                opacity: { duration: 1.2, delay: 4.8 + index * 0.1 },
                y: { duration: 1.2, delay: 4.8 + index * 0.1 },
                scale: { duration: 1.2, delay: 4.8 + index * 0.1 },
                x: { type: 'spring', stiffness: 120, damping: 20 },
                rotate: { type: 'spring', stiffness: 120, damping: 20 },
                zIndex: { duration: 0 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Внешний контейнер — рамка как в Hero */}
              <div
                className="relative rounded-[1.75rem] p-3"
                style={{
                  width: 'clamp(140px, 16vw, 230px)',
                  background: 'linear-gradient(145deg, rgba(212,197,169,0.15) 0%, rgba(166,123,91,0.08) 50%, rgba(26,15,10,0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `
                    0 30px 60px -15px rgba(0, 0, 0, 0.9),
                    0 20px 40px -10px rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(212, 197, 169, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                  `,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Золотая градиентная рамка */}
                <div
                  className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(212,197,169,0.4) 0%, transparent 30%, transparent 70%, rgba(212,197,169,0.2) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }}
                />

                {/* Внутренняя область с фото */}
                <div
                  className="relative rounded-[1.4rem] overflow-hidden"
                  style={{
                    aspectRatio: '3/4',
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover brightness-110 contrast-105 saturate-110"
                    priority
                  />

                  {/* Лёгкий золотой блик */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(212, 197, 169, 0.15) 0%, transparent 40%)',
                    }}
                  />

                  {/* Затемнение по краям */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
                    }}
                  />

                  {/* Золотая полоска сверху */}
                  <div
                    className="absolute top-1 left-[15%] right-[15%] h-[1px] transition-all duration-500"
                    style={{
                      background: collageOpen
                        ? 'linear-gradient(to right, transparent, rgba(212, 197, 169, 1), transparent)'
                        : 'linear-gradient(to right, transparent, rgba(212, 197, 169, 0.4), transparent)',
                      boxShadow: collageOpen ? '0 0 12px rgba(212, 197, 169, 0.6)' : 'none',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ============================================ */}
      {/* Заглушка GLORITER — эпичный текст */}
      {/* ============================================ */}
      <motion.div
        className="absolute z-10 flex items-center justify-center overflow-hidden"
        initial="initial"
        animate={controls}
        variants={{
          initial: { top: 0, left: 0, right: 0, bottom: 0, scale: 1.1, borderRadius: '0px' },
          visible: { top: 0, left: 0, right: 0, bottom: 0, scale: 1, borderRadius: '0px', transition: { duration: 2, ease: 'easeOut' } },
          strip: { top: 95, left: 0, right: 0, bottom: 'auto', height: '60px', scale: 1, borderRadius: '0px', transition: { duration: 1.8, ease: 'easeInOut' } },
        }}
      >
        <motion.span
          className="font-heading font-bold tracking-[0.35em] select-none"
          style={{
            background: 'linear-gradient(180deg, #F5E6C8 0%, #D4C5A9 40%, #A67B5B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 20px rgba(212, 197, 169, 0.5)) drop-shadow(0 0 40px rgba(212, 197, 169, 0.3)) drop-shadow(0 0 80px rgba(166, 123, 91, 0.2))`,
          }}
          animate={{ fontSize: ['72px', '72px', '22px'], letterSpacing: ['0.35em', '0.35em', '0.3em'] }}
          transition={{ duration: 3.8, times: [0, 0.5, 1], ease: 'easeInOut' }}
        >
          GLORITER
        </motion.span>
      </motion.div>

      {/* Затемнение — только снизу */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-[5] bg-gradient-to-t from-[#1A0F0A]/90 via-[#1A0F0A]/40 to-transparent pointer-events-none" />

      {/* ============================================ */}
      {/* Контент — внизу: заголовок + категории */}
      {/* ============================================ */}
      <div className="relative z-20 w-full max-w-6xl px-4 pb-12 md:pb-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-heading text-white drop-shadow-[0_0_40px_rgba(212,197,169,0.3)]">
            Один надежный партнер вместо десятков поставщиков
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/90 text-lg md:text-xl font-light tracking-wide drop-shadow-[0_0_30px_rgba(212,197,169,0.2)]">
            Полный комплекс материалов и оборудования для строительства и отделки.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <Reveal key={idx} delay={0.05 * (idx + 1)}>
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,197,169,0.15)] transition-all duration-300 hover:scale-105 hover:bg-white/15"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                }}
              >
                <div className="text-4xl md:text-5xl">{cat.icon}</div>
                <div className="mt-1 text-white/90 text-sm md:text-base font-heading">
                  {cat.name}
                </div>
                <div className="mt-0.5 text-[#D4C5A9]/60 text-[10px] md:text-xs leading-tight">
                  {cat.desc}
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
        <span>200+ поставщиков</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>Прямые контракты</span>
        <span className="w-px h-3 bg-[#D4C5A9]/20" />
        <span>Склад в РФ</span>
      </motion.div>
    </section>
  );
}