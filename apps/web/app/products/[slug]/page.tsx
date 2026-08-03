// web/app/products/[slug]/page.tsx
import { ProductDetails } from './components/ProductDetails';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/products/slug/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Ошибка загрузки');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// ✅ Это должен быть async компонент, который рендерит ProductDetails
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Если товара нет — показываем 404 вручную
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">
          Товар не найден
        </h1>
        <p className="text-secondary/60 mb-8">
          К сожалению, такого товара нет в нашем каталоге.
        </p>
        <Link
          href="/catalogue"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  // ✅ Передаём данные в клиентский компонент
  return <ProductDetails product={product} />;
}