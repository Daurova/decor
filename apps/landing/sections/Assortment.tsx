// apps/landing/sections/Assortment.tsx
'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// === 4 фото для слайдера ===
const collagePhotos = [
  { src: '/images/photos/photo4.jpg', alt: 'GLORITER — фото 1' },
  { src: '/images/photos/photo5.jpg', alt: 'GLORITER — фото 2' },
  { src: '/images/photos/photo6.jpg', alt: 'GLORITER — фото 3' },
  { src: '/images/photos/photo7.jpg', alt: 'GLORITER — фото 4' },
];

export function Assortment() {
  const controls = useAnimationControls();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.7 });

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
      {/* SWIPER — десктоп как было, адаптив ниже 1024 */}
      {/* ============================================ */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center px-4 pb-24 pt-16">
        <Swiper
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={90}
          loop={true}
          loopAdditionalSlides={3}
          speed={1000}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            // Мобильные (< 640px) — 1.4 фото, отступ 20
            0: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            // Планшет (640px+) — 2 фото, отступ 40
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            // Десктоп (1024px+) — как было: 3 фото, отступ 90
            1024: {
              slidesPerView: 3,
              spaceBetween: 90,
            },
          }}
          className="assortment-swiper w-full max-w-5xl"
        >
          {[...collagePhotos, ...collagePhotos, ...collagePhotos].map((photo, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="relative rounded-[1.5rem] p-2"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.5 + (index % 4) * 0.15 }}
                style={{
                  background: 'linear-gradient(145deg, rgba(212,197,169,0.15) 0%, rgba(166,123,91,0.08) 50%, rgba(26,15,10,0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `
                    0 30px 60px -15px rgba(0, 0, 0, 0.9),
                    0 20px 40px -10px rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(212, 197, 169, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                }}
              >
                <div 
                  className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(212,197,169,0.4) 0%, transparent 30%, transparent 70%, rgba(212,197,169,0.2) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }}
                />
                <div className="relative rounded-[1.2rem] overflow-hidden" style={{ aspectRatio: '9/16' }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover brightness-110 contrast-105 saturate-110"
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 25vw"
                    priority
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ============================================ */}
      {/* Заглушка GLORITER — как было */}
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading text-white drop-shadow-[0_0_40px_rgba(212,197,169,0.3)]">
            Один надежный партнер вместо десятков поставщиков
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-[#D4C5A9]/90 font-light tracking-wide drop-shadow-[0_0_30px_rgba(212,197,169,0.2)]">
            Полный комплекс материалов и оборудования для строительства и отделки.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <Reveal key={idx} delay={0.05 * (idx + 1)}>
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,197,169,0.15)] transition-all duration-300 hover:scale-105 hover:bg-white/15"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                }}
              >
                <div className="text-3xl md:text-5xl">{cat.icon}</div>
                <div className="mt-1 text-white/90 text-xs md:text-base font-heading">
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