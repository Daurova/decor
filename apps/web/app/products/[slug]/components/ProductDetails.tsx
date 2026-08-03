// web/app/products/[slug]/components/ProductDetails.tsx
'use client';

import { Breadcrumbs } from '../../../shared/ui/Breadcrumbs';
import { ProductPageGallery } from './ProductPageGallery'; // ← новый импорт

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  categoryName: string;
  categoryId: number;
  imageUrl: string;
  images: string[];
  length: number | null;
  height: number | null;
  material: string | null;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const allImages = product.images?.length > 0 
    ? [product.imageUrl, ...product.images] 
    : [product.imageUrl];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог', href: '/catalogue' },
          { label: product.categoryName || 'Товар', href: `/catalogue?category=${product.categoryId}` },
          { label: product.name, href: `/products/${product.slug}`, active: true },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Левая колонка — галерея */}
        <ProductPageGallery
          images={allImages}
          name={product.name}
        />

        {/* Правая колонка — информация */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">
            {product.name}
          </h1>
          
          <p className="text-3xl font-bold text-primary">
            {product.price} ₽
          </p>
          
          {product.description && (
            <p className="text-secondary/80">{product.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {product.length && product.height && (
              <span className="px-3 py-1 bg-muted rounded-full text-sm">
                {product.length}×{product.height} мм
              </span>
            )}
            {product.material && (
              <span className="px-3 py-1 bg-muted rounded-full text-sm">
                {product.material}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}