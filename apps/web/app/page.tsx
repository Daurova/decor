'use client'
import Image from "next/image";
import { CategoryCard } from "./entities/category_card/CategoryCard";
import { CategoryCardSkeleton } from "./entities/category_card/CathegotyCardSkeleton";
import { useState, useEffect } from 'react'
import { CardGrid } from "./shared/ui/CardGrid";
import { PromoCarousel }  from './shared/ui/PromoCarousel';

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
  { id: 1, name: 'Гибкий камень', slug: 'furniture', imageUrl: 'https://placehold.co/400x400', productCount: 42 },
  { id: 2, name: 'Освещение', slug: 'lighting', imageUrl: 'https://placehold.co/400x400', productCount: 28 },
  { id: 3, name: 'Гибкий камень', slug: 'decor', imageUrl: 'https://placehold.co/400x400', productCount: 56 },
  { id: 4, name: 'Гибкий камень', slug: 'textile', imageUrl: 'https://placehold.co/400x400', productCount: 33 },
  { id: 5, name: 'Освещение', slug: 'tableware', imageUrl: 'https://placehold.co/400x400', productCount: 19 },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false)
    },10000)

    return ()=>clearTimeout(timer)
  },[])

  return (
    
    <div className="flex flex-col flex-1 items-center justify-centerfont-sans font-sans bg-background-secondary">
      <div className=" w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <PromoCarousel items ={ mockPromos } />
        </div>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background-secondary sm:items-start">
        <div>
          <CardGrid>{isLoading? 
             Array.from({length:5}).map((_, index) => (
              <CategoryCardSkeleton key={`skeleton-${index}`} />
            ))
          : mockCategories.map(category=>{
            return(
              <CategoryCard  key = {category.id} id = {category.id} slug = {category.slug} name = {category.name} imageUrl={category.imageUrl}></CategoryCard>
            )
          })
          }
          </CardGrid>
        </div>
      </main>
    </div>
  );
}
