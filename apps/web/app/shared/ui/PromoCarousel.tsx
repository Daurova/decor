'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import '../../globals.css'
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

interface PromoItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  discount?: string;
}

interface PromoCarouselProps {
  items: PromoItem[];
}

export function PromoCarousel({ items }: PromoCarouselProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="promo-carousel"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <PromoCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function PromoCard({ title, description, imageUrl, link, discount }: PromoItem) {
  return (
    <Link href={link} className="block group">
      <div className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
        {/* Изображение — ещё ниже: h-40 вместо h-48 */}
        <div className="relative h-40 w-full md:h-auto md:w-2/5">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-linear-to-r from-mauve-300 to-primary-border text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10">
              –{discount}%
            </div>
          )}
        </div>

        {/* Текстовый блок — уменьшенные отступы и шрифты */}
        <div className="flex flex-1 flex-col justify-center p-3 md:p-4 bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <h3 className="font-heading text-base font-bold text-gray-600 md:text-lg lg:text-xl">
            {title}
          </h3>
          {/* description закомментирован, но если понадобится — его тоже можно уменьшить */}
          {/* <div className="mt-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-border/20 px-3 py-1 text-xs font-semibold text-primary-border transition-all group-hover:bg-primary-border group-hover:text-white dark:bg-primary-border/30">
              Подробнее
  <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  );
}