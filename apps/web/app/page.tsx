import Image from "next/image";
import { CategoryCard } from "./entities/category_card/CategoryCard";

const mockCategories = [
  { id: 1, name: 'Гибкий камень', slug: 'furniture', imageUrl: 'https://placehold.co/400x400', productCount: 42 },
  { id: 2, name: 'Освещение', slug: 'lighting', imageUrl: 'https://placehold.co/400x400', productCount: 28 },
  { id: 3, name: 'Гибкий камень', slug: 'decor', imageUrl: 'https://placehold.co/400x400', productCount: 56 },
  { id: 4, name: 'Гибкий камень', slug: 'textile', imageUrl: 'https://placehold.co/400x400', productCount: 33 },
  { id: 5, name: 'Освещение', slug: 'tableware', imageUrl: 'https://placehold.co/400x400', productCount: 19 },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-centerfont-sans font-sans bg-background-secondary">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background-secondary sm:items-start">
        <div>
          <h1 className = 'text-foreground bg-background-secondary font-sans'>ГЛАВНАЯ СТРАНИЦА</h1>
          {mockCategories.map(category=>{
            return(
              <CategoryCard  key = {category.id} id = {category.id} slug = {category.slug} name = {category.name} imageUrl={category.imageUrl}></CategoryCard>
            )
          })}
        </div>
      </main>
    </div>
  );
}
