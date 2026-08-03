'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product, FilterState } from '../../../types/types';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { ProductImageGallery } from '../ProductImagesGallery/ProductImagesGallery';
import Link from 'next/link';

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    colors: [],
    materials: [],
    styles: [],
    lightingTypes: [],
    priceRange: [0, 100000],
    lengthRange: [0, 10000],
    heightRange: [0, 10000],
    thicknessRange: [0, 100],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const productsRes = await fetch(`${baseUrl}/products?limit=100`);
        if (!productsRes.ok) throw new Error('Ошибка загрузки товаров');
        const productsData = await productsRes.json();

        const formattedProducts = productsData.data.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
          slug: p.slug,
          categoryId: p.categoryId,
          categoryName: p.categoryName || 'Без категории',
          price: parseFloat(p.price) || 0,
          image: p.imageUrl || '/placeholder.png',
          height: p.height !== null && p.height !== undefined ? Number(p.height) : null,
          length: p.length !== null && p.length !== undefined ? Number(p.length) : null,
          thickness: p.thickness !== null && p.thickness !== undefined ? Number(p.thickness) : null,
          additionalInfo: p.additionalInfo || null,
          material: p.material || 'Гибкий камень',
          color: p.color || [],
          inStock: true,
          style: p.style || [],
          lightingType: p.lightingType || null,
          images: p.images || [],
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUniqueValues = (products: Product[], key: keyof Product) => {
    if (key === 'color' || key === 'style') {
      const values = products.flatMap(p => p[key] as string[]);
      return [...new Set(values)];
    }
    if (key === 'material') return [...new Set(products.map(p => p.material))];
    if (key === 'lightingType') return [...new Set(products.filter(p => p.lightingType).map(p => p.lightingType as string))];
    return [];
  };

  const categories = useMemo(() => {
    const names = [...new Set(products.map(p => p.categoryName).filter(Boolean))];
    return names.map(name => ({ id: name, name }));
  }, [products]);

  const availableColors = getUniqueValues(products, 'color');
  const availableMaterials = getUniqueValues(products, 'material');
  const availableStyles = getUniqueValues(products, 'style');
  const availableLightingTypes = getUniqueValues(products, 'lightingType');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== 'all' && product.categoryName !== filters.category) return false;
      if (filters.colors.length && !product.color.some(c => filters.colors.includes(c))) return false;
      if (filters.materials.length && !filters.materials.includes(product.material)) return false;
      if (filters.styles.length && product.style?.some(s => filters.styles.includes(s))) return false;
      if (filters.lightingTypes.length && (!product.lightingType || !filters.lightingTypes.includes(product.lightingType))) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (product.length !== null && product.length !== undefined) {
        if (product.length < filters.lengthRange[0] || product.length > filters.lengthRange[1]) return false;
      }
      if (product.height !== null && product.height !== undefined) {
        if (product.height < filters.heightRange[0] || product.height > filters.heightRange[1]) return false;
      }
      if (product.thickness !== null && product.thickness !== undefined) {
        if (product.thickness < filters.thicknessRange[0] || product.thickness > filters.thicknessRange[1]) return false;
      }
      return true;
    });
  }, [products, filters]);

  const toggleFilter = (arrayKey: keyof Pick<FilterState, 'colors' | 'materials' | 'styles' | 'lightingTypes'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].includes(value) ? prev[arrayKey].filter(v => v !== value) : [...prev[arrayKey], value],
    }));
  };

  const updateRange = (key: keyof Pick<FilterState, 'lengthRange' | 'heightRange' | 'thicknessRange'>, index: 0 | 1, value: number) => {
    setFilters(prev => {
      const newRange = [...prev[key]] as [number, number];
      newRange[index] = value;
      return { ...prev, [key]: newRange };
    });
  };

  const FiltersPanel = () => (
    <div className="space-y-6">
      {categories.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3 text-secondary">Категория</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filters.category === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-secondary hover:bg-primary/20'
              }`}
            >
              Все
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.name }))}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.category === cat.name 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-secondary hover:bg-primary/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableColors.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3 text-secondary">Цвет</h3>
          <div className="flex gap-2 flex-wrap">
            {availableColors.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter('colors', color)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.colors.includes(color) 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-secondary hover:bg-primary/20'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableMaterials.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3 text-secondary">Материал</h3>
          <div className="flex gap-2 flex-wrap">
            {availableMaterials.map(mat => (
              <button
                key={mat}
                onClick={() => toggleFilter('materials', mat)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.materials.includes(mat) 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-secondary hover:bg-primary/20'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-heading font-semibold mb-3 text-secondary">Длина, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.lengthRange[0]}
            onChange={e => updateRange('lengthRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="от"
          />
          <span className="text-secondary">—</span>
          <input
            type="number"
            value={filters.lengthRange[1]}
            onChange={e => updateRange('lengthRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="до"
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-3 text-secondary">Высота, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.heightRange[0]}
            onChange={e => updateRange('heightRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="от"
          />
          <span className="text-secondary">—</span>
          <input
            type="number"
            value={filters.heightRange[1]}
            onChange={e => updateRange('heightRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="до"
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-3 text-secondary">Толщина, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.thicknessRange[0]}
            onChange={e => updateRange('thicknessRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="от"
          />
          <span className="text-secondary">—</span>
          <input
            type="number"
            value={filters.thicknessRange[1]}
            onChange={e => updateRange('thicknessRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="до"
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-3 text-secondary">Цена, ₽</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={e => setFilters(prev => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="от"
          />
          <span className="text-secondary">—</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={e => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
            className="w-20 rounded-lg border border-border bg-surface p-1 text-sm text-secondary dark:bg-surface"
            placeholder="до"
          />
        </div>
      </div>

      {availableStyles.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3 text-secondary">Стиль</h3>
          <div className="flex gap-2 flex-wrap">
            {availableStyles.map(style => (
              <button
                key={style}
                onClick={() => toggleFilter('styles', style)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.styles.includes(style) 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-secondary hover:bg-primary/20'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableLightingTypes.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3 text-secondary">Тип освещения</h3>
          <div className="flex gap-2 flex-wrap">
            {availableLightingTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleFilter('lightingTypes', type)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.lightingTypes.includes(type) 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-secondary hover:bg-primary/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() =>
          setFilters({
            category: 'all',
            colors: [],
            materials: [],
            styles: [],
            lightingTypes: [],
            priceRange: [0, 100000],
            lengthRange: [0, 10000],
            heightRange: [0, 10000],
            thicknessRange: [0, 100],
          })
        }
        className="text-sm text-primary hover:underline transition-all"
      >
        Сбросить все
      </button>
    </div>
  );

  if (loading) return <div className="text-center py-12 text-secondary">Загрузка товаров...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Ошибка: {error}</div>;

  return (
    <div className="relative">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full transition-all hover:bg-primary/80"
        >
          <FunnelIcon className="h-5 w-5" /> Фильтры
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-72 flex-shrink-0 p-5 rounded-2xl bg-surface/70 dark:bg-surface/70 backdrop-blur-sm shadow-lg sticky top-24 h-fit border border-border/20">
          <FiltersPanel />
        </aside>

        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-secondary">Товаров не найдено</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map(product => (
                    <Link
                key={product.id}
                href={`/products/${product.slug || product.id}`} // используем slug, если есть, или id
                className="group bg-surface dark:bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-border/10 cursor-pointer no-underline"
              >
                  <div className="flex-[7.5] min-h-0">
                    <ProductImageGallery
                      mainImage={product.image}
                      images={product.images || []}
                      name={product.name}
                      inStock={product.inStock}
                    />
                  </div>

                  <div className="flex-[2.5] p-2.5 md:p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-xs md:text-sm line-clamp-1 leading-tight text-secondary">
                        {product.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-secondary/60 line-clamp-1 mt-0.5">
                        {product.length && product.height
                          ? `${product.length}×${product.height} мм`
                          : product.material || 'Гибкий камень'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-primary font-bold text-sm md:text-base">
                        {product.price > 0 ? `${product.price} ₽` : 'Цена по запросу'}
                      </p>
                      <button className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium hover:bg-primary hover:text-white hover:cursor-pointer transition-colors pointer-events-none">
                        Подробнее
                      </button>
                    </div>
                  </div>
                              </Link>

              ))}
            </div>
          )}
        </main>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-surface dark:bg-surface shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold text-secondary">Фильтры</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <FiltersPanel />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary/80 transition-all"
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}