// apps/landing/sections/Hero.tsx
'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const photos = [
  { src: '/images/photos/photo1.jpg', alt: 'GLORITER — объект 1' },
  { src: '/images/photos/photo2.jpg', alt: 'GLORITER — объект 2' },
  { src: '/images/photos/photo3.jpg', alt: 'GLORITER — объект 3' },
];

// ============================================
// Отдельный компонент для фото десктопа
// ============================================
function HeroPhotoDesktop({ photo, index }: { photo: typeof photos[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40, scale: 0.9, rotateY: -15 }}
      animate={{ 
        opacity: 1, 
        y: [0, -12, 0],
        scale: 1, 
        rotateY: 0 
      }}
      transition={{
        opacity: { duration: 1.2, delay: 4.5 + index * 0.2 },
        scale: { duration: 1.2, delay: 4.5 + index * 0.2 },
        rotateY: { duration: 1.2, delay: 4.5 + index * 0.2 },
        y: {
          duration: 4 + index * 0.3,
          repeat: 1,
          ease: 'easeInOut',
          delay: 5.5 + index * 0.3,
        },
      }}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-[1.75rem] p-3"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        style={{
          width: 'clamp(180px, 22vw, 290px)',
          background: 'linear-gradient(145deg, rgba(212,197,169,0.15) 0%, rgba(166,123,91,0.08) 50%, rgba(26,15,10,0.4) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: isHovered
            ? `
              0 40px 80px -15px rgba(0, 0, 0, 1),
              0 25px 50px -10px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(212, 197, 169, 0.35),
              0 0 60px rgba(212, 197, 169, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `
            : `
              0 30px 60px -15px rgba(0, 0, 0, 0.9),
              0 20px 40px -10px rgba(0, 0, 0, 0.7),
              0 0 0 1px rgba(212, 197, 169, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `,
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.4s ease',
        }}
      >
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
        <div
          className="relative rounded-[1.4rem] overflow-hidden"
          style={{ aspectRatio: '9/16' }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover brightness-110 contrast-105 saturate-110"
            priority
          />
        </div>
        <div 
          className="absolute top-1 left-[20%] right-[20%] h-[1px] transition-all duration-500"
          style={{
            background: isHovered
              ? 'linear-gradient(to right, transparent, rgba(212,197,169,1), transparent)'
              : 'linear-gradient(to right, transparent, rgba(212,197,169,0.6), transparent)',
            boxShadow: isHovered ? '0 0 12px rgba(212,197,169,0.6)' : 'none',
          }}
        />
      </motion.div>

      <div 
        className="absolute -bottom-8 left-[15%] right-[15%] h-10 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.5 : 0.3,
          background: 'radial-gradient(ellipse, rgba(212,197,169,0.5) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

// ============================================
// Основной Hero
// ============================================
export function Hero() {
  const controls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const run = async () => {
      await controls.start('visible');
      await controls.start('strip');
    };
    run();
  }, [controls]);

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
      {/* МОБИЛЬНЫЕ — SWIPER с авто-прокруткой */}
{/* Мобильные — Swiper */}
{isMobile && (
  <div className="absolute inset-0 z-[15] flex items-center justify-center px-4 pb-24">
    <Swiper
      modules={[Pagination, Autoplay]}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      spaceBetween={16}
      loop={true}
      loopAdditionalSlides={3}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      pagination={{ clickable: true }}
      className="hero-swiper w-full"
      
    >
      {[...photos, ...photos, ...photos].map((photo, index) => (
        <SwiperSlide key={index}>
          <motion.div
            className="relative rounded-[1.5rem] p-2"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 4.5 + (index % 3) * 0.2 }}
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
                priority
              />
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

      {/* ДЕСКТОП — 3 фото */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-[1] flex items-center justify-center gap-8 md:gap-14 lg:gap-24 px-4"
          style={{ perspective: '1200px' }}
        >
          {photos.map((photo, index) => (
            <HeroPhotoDesktop key={index} photo={photo} index={index} />
          ))}
        </div>
      )}

      {/* Заглушка GLORITER */}
      <motion.div
        className="absolute z-20 flex items-center justify-center overflow-hidden"
        initial="initial"
        animate={controls}
        variants={{
          initial: { top: 0, left: 0, right: 0, bottom: 0, scale: 1.1, borderRadius: '0px' },
          visible: { top: 0, left: 0, right: 0, bottom: 0, scale: 1, borderRadius: '0px', transition: { duration: 2, ease: 'easeOut' } },
          strip: { top: 95, left: 0, right: 0, bottom: 'auto', height: '60px', scale: 1, borderRadius: '0px', transition: { duration: 1.8, ease: 'easeInOut' } },
        }}
      >
        <motion.span
          className="font-heading font-bold tracking-[0.2em] md:tracking-[0.35em] select-none"
          style={{
            background: 'linear-gradient(180deg, #F5E6C8 0%, #D4C5A9 40%, #A67B5B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 20px rgba(212, 197, 169, 0.5)) drop-shadow(0 0 40px rgba(212, 197, 169, 0.3)) drop-shadow(0 0 80px rgba(166, 123, 91, 0.2))`,
          }}
          animate={{
            fontSize: isMobile ? ['48px', '48px', '18px'] : ['72px', '72px', '22px'],
            letterSpacing: isMobile ? ['0.2em', '0.2em', '0.15em'] : ['0.35em', '0.35em', '0.3em'],
          }}
          transition={{ duration: 3.8, times: [0, 0.5, 1], ease: 'easeInOut' }}
        >
          GLORITER
        </motion.span>
      </motion.div>

      {/* Затемнение снизу */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-[5] bg-gradient-to-t from-[#1A0F0A]/90 via-[#1A0F0A]/40 to-transparent pointer-events-none" />

      {/* Контент */}
      <div className="relative z-20 w-full max-w-xl px-4 md:px-6 pb-6 md:pb-10 text-center">
        <Reveal>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-heading text-white drop-shadow-lg leading-tight">
            Комплексные поставки <br />
            <span className="text-[#D4C5A9] drop-shadow-[0_0_30px_rgba(212,197,169,0.15)]">
              материалов и инженерных решений для ваших объектов 
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/60 text-[10px] sm:text-xs md:text-sm font-light tracking-wide max-w-lg leading-relaxed mx-auto">
            Фасады, отделочные материалы, освещение, паркинги, благоустройство территории, инженерные системы
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-3 px-4 md:px-5 py-2 rounded-full bg-[#A67B5B] text-white font-medium text-[10px] sm:text-xs md:text-sm shadow-lg shadow-black/20 transition-all duration-300"
          >
            Запросить коммерческое предложение
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}