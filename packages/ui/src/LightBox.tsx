'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export function LightBox({ src, alt = '', onClose }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer px-4 py-6 md:px-10 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>

          {/* Обёртка w-fit — рамка обтягивает именно фото */}
          <div className="relative w-fit h-fit">
            <motion.div
              className="relative rounded-[1.75rem] p-3"
              initial={{ scale: 0.85, opacity: 0, rotateY: -8 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateY: 8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background:
                  'linear-gradient(145deg, rgba(212,197,169,0.15) 0%, rgba(166,123,91,0.08) 50%, rgba(26,15,10,0.4) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 40px 80px -15px rgba(0, 0, 0, 1),
                  0 25px 50px -10px rgba(0, 0, 0, 0.8),
                  0 0 0 1px rgba(212, 197, 169, 0.35),
                  0 0 60px rgba(212, 197, 169, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                `,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Двойная золотая обводка */}
              <div
                className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(212,197,169,0.5) 0%, transparent 30%, transparent 70%, rgba(212,197,169,0.3) 100%)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />

              {/* Верхний световой штрих */}
              <div
                className="absolute top-1 left-[20%] right-[20%] h-[1px]"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(212,197,169,1), transparent)',
                  boxShadow: '0 0 12px rgba(212,197,169,0.6)',
                }}
              />

              {/* Фото задаёт размер рамки */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="block rounded-[1.4rem] object-contain brightness-110 contrast-105 saturate-110"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                }}
              />

              {/* Мягкая подсветка снизу */}
              <div
                className="absolute -bottom-8 left-[15%] right-[15%] h-10 rounded-full blur-2xl pointer-events-none"
                style={{
                  opacity: 0.5,
                  background:
                    'radial-gradient(ellipse, rgba(212,197,169,0.5) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}