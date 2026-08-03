// web/app/products/[slug]/components/ProductPageGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductPageGalleryProps {
  images: string[];
  name: string;
}

export function ProductPageGallery({ images, name }: ProductPageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allImages = images.length > 0 ? images : ['/placeholder.png'];

  return (
    <div className="w-full">
      {/* Основное изображение */}
      <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
        <Image
          src={allImages[selectedIndex]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Миниатюры */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-primary'
                  : 'border-transparent hover:border-primary/50'
              }`}
            >
              <Image
                src={img}
                alt={`${name} - фото ${index + 1}`}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}