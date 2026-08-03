'use client';

import Image from 'next/image';
import { CategoryCard } from './entities/category_card/CategoryCard';
import { CategoryCardSkeleton } from './entities/category_card/CathegotyCardSkeleton';
import { useState, useEffect } from 'react';
import { CardGrid } from './shared/ui/CardGrid';
import { PromoCarousel } from './shared/ui/PromoCarousel';
import { ProductShowcase } from './entities/ProductShowCase/ProductShowCase';
// //@ts-ignore
// import '@repo/styles';


// Моковые данные спецпредложений
const mockPromos = [
  {
    id: 1,
    title: 'Новая коллекция гибкого камня',
    description: 'Экологичные материалы, уникальные текстуры. Создайте уют в вашем доме с нашей премиальной серией.',
    imageUrl: 'https://placehold.co/800x600',
    link: '/promo/stone-collection',
    discount: '20',
  },
  {
    id: 2,
    title: 'Дизайнерское освещение',
    description: 'Светильники, которые меняют атмосферу. Бесплатная доставка и установка при заказе от 15 000 ₽.',
    imageUrl: 'https://placehold.co/800x600',
    link: '/promo/lighting',
    discount: '15',
  },
  {
    id: 3,
    title: 'Скидка на декор до 50%',
    description: 'Вазы, панно, зеркала – всё для создания интерьера мечты. Только до конца месяца.',
    imageUrl: 'https://placehold.co/800x600',
    link: '/promo/decor-sale',
    discount: '50',
  },
];

const mockCategories = [
  { id: 1, name: 'Гибкий камень', slug: 'gibkii-kamen', imageUrl: 'https://placehold.co/400x400', productCount: 42 },
  { id: 2, name: 'Освещение', slug: 'lighting', imageUrl: 'https://placehold.co/400x400', productCount: 28 },
  { id: 3, name: 'Декор', slug: 'decor', imageUrl: 'https://placehold.co/400x400', productCount: 56 },
  { id: 4, name: 'Фасады', slug: 'facades', imageUrl: 'https://placehold.co/400x400', productCount: 33 },
  { id: 5, name: 'Покрытия', slug: 'coverings', imageUrl: 'https://placehold.co/400x400', productCount: 19 },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Блок промо-карусели */}
        <div className="mb-8">
          <PromoCarousel items={mockPromos} />
        </div>

        {/* Заголовок категорий */}
        <div className="mb-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary tracking-tight">
            Категории товаров
          </h2>
          <p className="text-secondary/60 text-sm mt-1 font-light">
            Выберите категорию и найдите идеальный материал для вашего проекта
          </p>
        </div>

        {/* Сетка категорий */}
        <main>
          <CardGrid>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CategoryCardSkeleton key={`skeleton-${index}`} />
                ))
              : mockCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    slug={category.slug}
                    name={category.name}
                    imageUrl={category.imageUrl}
                  />
                ))}
          </CardGrid>
        </main>

        {/* Декоративный разделитель */}
        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-secondary/30 text-xs tracking-[0.2em] uppercase font-light">
            GLORITER — ваш надёжный поставщик
          </p>
        </div>
      </div>
    </div>
  );
}