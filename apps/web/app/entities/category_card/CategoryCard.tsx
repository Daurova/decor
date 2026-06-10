'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  productCount?: number;
}

export function CategoryCard({ id, name, slug, imageUrl, productCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-background-secondary shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Изображение */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Текст */}
        <div className="p-4 text-center">
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary-border">
            {name}
          </h3>
          {productCount !== undefined && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {productCount} товаров
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}