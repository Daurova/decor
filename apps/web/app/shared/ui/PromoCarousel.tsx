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
      <div className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Блок изображения (занимает 40% на десктопе, на мобильных – сверху) */}
        <div className="relative h-56 w-full md:h-auto md:w-2/5">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-mauve-300 to-mauve-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
              –{discount}%
            </div>
          )}
        </div>

        {/* Текстовый блок */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <h3 className="font-heading text-2xl font-bold text-gray-600 md:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 md:text-lg line-clamp-3">
            {description}
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-border/20 px-5 py-2 text-sm font-semibold text-primary-border transition-all group-hover:bg-primary-border group-hover:text-white dark:bg-primary-border/30">
              Подробнее
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}