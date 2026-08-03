// web/app/products/[slug]/components/ProductDetails.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Breadcrumbs } from '../../../shared/ui/Breadcrumbs';
import { ProductPageGallery } from './ProductPageGallery';
import { ProductAttributes } from './ProductAttributes';
import { RelatedProducts } from './RelatedProducts';
import { TryInInterior } from './TryInInterior';

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
  thickness: number | null;
  material: string | null;
  color: string[];
  style: string[];
  lightingType: string | null;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isInteriorMode, setIsInteriorMode] = useState(false);

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
        <div className="flex flex-col">
          <ProductPageGallery
            images={allImages}
            name={product.name}
          />
        </div>

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

          {/* Кнопка-переключатель */}
          <button
            onClick={() => setIsInteriorMode(!isInteriorMode)}
            className={`
              relative px-6 py-3 rounded-xl font-medium transition-all
              flex items-center justify-center gap-2
              ${isInteriorMode 
                ? 'bg-muted text-secondary hover:bg-muted/80' 
                : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:scale-[1.02]'
              }
            `}
          >
            {isInteriorMode ? (
              <>📋 Показать характеристики</>
            ) : (
              <>
                   <svg 
        className="w-5 h-5 flex-shrink-0" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
        <path d="M19 16L19.5 18.5L22 19L19.5 19.5L19 22L18.5 19.5L16 19L18.5 18.5L19 16Z" />
      </svg>
              Попробовать в интерьере с ИИ</>
            )}
          </button>

          {/* Контент с анимацией */}
          <AnimatePresence mode="wait">
            {isInteriorMode ? (
              <motion.div
                key="interior"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TryInInterior 
                  product={product} 
                  onClose={() => setIsInteriorMode(false)} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="attributes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProductAttributes product={product} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Похожие товары */}
      <div className="mt-16">
        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}