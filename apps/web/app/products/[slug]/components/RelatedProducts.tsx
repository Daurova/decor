// web/app/products/[slug]/components/RelatedProducts.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: number;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
    fetch(`${API_URL}/products?categoryId=${categoryId}&limit=5`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then(data => {
        const filtered = data.data
          .filter((p: any) => p.id !== currentProductId)
          .slice(0, 4);
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <div className="mt-12 pt-6 border-t-2 border-border/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-secondary/40 uppercase tracking-wider">
            Похожие товары
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-2 space-y-1.5">
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-2.5 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-6 border-t-2 border-border/20">

      {/* Разделитель с заголовком */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-s font-medium text-secondary/40 uppercase tracking-wider whitespace-nowrap">
          Похожие товары
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={product.imageUrl || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-medium leading-tight line-clamp-2 text-secondary group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-primary font-bold text-sm mt-0.5">
                {product.price} ₽
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}