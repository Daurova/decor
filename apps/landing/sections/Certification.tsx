// apps/landing/sections/Certification.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@repo/ui/Reveal';

export function Certification() {
  const points = [
    { icon: '', title: 'Все товары сертифицированы', desc: 'Соответствие ГОСТ, ТР ТС, пожарным нормам' },
    { icon: '', title: 'Помогаем с госэкспертизой', desc: 'Готовим пакет документов для проектной экспертизы' },
    { icon: '', title: 'Сертификаты и декларации', desc: 'Предоставляем полный комплект разрешительной документации' },
    { icon: '', title: 'Контроль качества', desc: 'Собственная лаборатория и выборочная проверка партий' },
  ];

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
      {/* Фоновое изображение */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://placehold.co/1920x1080/3E2C1B/a48159?text=GLORITER')",
          backgroundColor: '#3E2C1B',
        }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 2,
          ease: 'easeOut',
        }}
      />

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
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4C5A9]/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
      />

      {/* Контент — внизу */}
      <div className="relative z-10 w-full max-w-6xl px-4 pb-12 md:pb-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-heading text-white drop-shadow-[0_0_40px_rgba(212,197,169,0.3)]">
            Сертификация — наша зона ответственности
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-2 text-[#D4C5A9]/90 text-lg md:text-xl font-light tracking-wide drop-shadow-[0_0_30px_rgba(212,197,169,0.2)]">
            Без сертификатов не сдать объект. Мы закрываем этот вопрос полностью.
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