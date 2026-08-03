'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface ProductImageGalleryProps {
  mainImage: string;
  images?: string[];
  name: string;
  inStock?: boolean;
}

export function ProductImageGallery({
  mainImage,
  images = [],
  name,
  inStock = true,
}: ProductImageGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Детальные фото — исключаем главное
  const detailImages = images.filter(img => img !== mainImage);
  const hasMultipleImages = detailImages.length > 0;

  return (
    <div
      className="relative h-48 w-full overflow-hidden bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasMultipleImages && isHovered ? (
        // Свайпер с детальными фото (без главного)
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {detailImages.map((img, idx) => (
            <SwiperSlide key={idx} className="h-full w-full">
              <Image
                src={img}
                alt={`${name} детальное фото ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Статичное главное фото
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {!inStock && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
          Нет в наличии
        </div>
      )}
    </div>
  );
}