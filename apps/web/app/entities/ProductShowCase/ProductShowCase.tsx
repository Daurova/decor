'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product, FilterState } from '../../../types/types';
import Image from 'next/image';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

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
    // Инициализация фильтров по размерам (диапазоны)
    lengthRange: [0, 10000],
    heightRange: [0, 10000],
    thicknessRange: [0, 100],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Загрузка данных

  
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

  // Получаем уникальные значения для фильтров
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

  // Фильтрация товаров (добавлены проверки по размерам)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Категория
      if (filters.category !== 'all' && product.categoryName !== filters.category) return false;
      // Цвета
      if (filters.colors.length && !product.color.some(c => filters.colors.includes(c))) return false;
      // Материал
      if (filters.materials.length && !filters.materials.includes(product.material)) return false;
      // Стили
      if (filters.styles.length && product.style?.some(s => filters.styles.includes(s))) return false;
      // Тип освещения
      if (filters.lightingTypes.length && (!product.lightingType || !filters.lightingTypes.includes(product.lightingType))) return false;
      // Цена
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      // Длина
      if (product.length !== null && product.length !== undefined) {
        if (product.length < filters.lengthRange[0] || product.length > filters.lengthRange[1]) return false;
      }
      // Высота
      if (product.height !== null && product.height !== undefined) {
        if (product.height < filters.heightRange[0] || product.height > filters.heightRange[1]) return false;
      }
      // Толщина
      if (product.thickness !== null && product.thickness !== undefined) {
        if (product.thickness < filters.thicknessRange[0] || product.thickness > filters.thicknessRange[1]) return false;
      }
      return true;
    });
  }, [products, filters]);

  useEffect(() => {
  console.log('=== ДИАГНОСТИКА ===');
  console.log('Всего товаров:', products.length);
  console.log('Первый товар:', products[0]);
  console.log('Текущие фильтры:', filters);
  console.log('Отфильтровано товаров:', filteredProducts.length);
}, [products, filters, filteredProducts]);

  const toggleFilter = (arrayKey: keyof Pick<FilterState, 'colors' | 'materials' | 'styles' | 'lightingTypes'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].includes(value) ? prev[arrayKey].filter(v => v !== value) : [...prev[arrayKey], value],
    }));
  };

  // Обновление диапазона для размеров
  const updateRange = (key: keyof Pick<FilterState, 'lengthRange' | 'heightRange' | 'thicknessRange'>, index: 0 | 1, value: number) => {
    setFilters(prev => {
      const newRange = [...prev[key]] as [number, number];
      newRange[index] = value;
      return { ...prev, [key]: newRange };
    });
  };
console.log('...products', products)
  // Панель фильтров (добавлены блоки для размеров)
  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Категория */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Категория</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filters.category === 'all' ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Все
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.name }))}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.category === cat.name ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Цвета */}
      {availableColors.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Цвет</h3>
          <div className="flex gap-2 flex-wrap">
            {availableColors.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter('colors', color)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.colors.includes(color) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Материал */}
      {availableMaterials.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Материал</h3>
          <div className="flex gap-2 flex-wrap">
            {availableMaterials.map(mat => (
              <button
                key={mat}
                onClick={() => toggleFilter('materials', mat)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.materials.includes(mat) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Длина */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Длина, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.lengthRange[0]}
            onChange={e => updateRange('lengthRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="от"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.lengthRange[1]}
            onChange={e => updateRange('lengthRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="до"
          />
        </div>
      </div>

      {/* Высота */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Высота, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.heightRange[0]}
            onChange={e => updateRange('heightRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="от"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.heightRange[1]}
            onChange={e => updateRange('heightRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="до"
          />
        </div>
      </div>

      {/* Толщина */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Толщина, мм</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.thicknessRange[0]}
            onChange={e => updateRange('thicknessRange', 0, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="от"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.thicknessRange[1]}
            onChange={e => updateRange('thicknessRange', 1, Number(e.target.value))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="до"
          />
        </div>
      </div>

      {/* Цена (оставляем как есть) */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Цена, ₽</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={e => setFilters(prev => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="от"
          />
          <span>—</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={e => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
            className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800"
            placeholder="до"
          />
        </div>
      </div>

      {/* Стиль (оставляем, если есть данные) */}
      {availableStyles.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Стиль</h3>
          <div className="flex gap-2 flex-wrap">
            {availableStyles.map(style => (
              <button
                key={style}
                onClick={() => toggleFilter('styles', style)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.styles.includes(style) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Тип освещения (оставляем, если есть данные) */}
      {availableLightingTypes.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Тип освещения</h3>
          <div className="flex gap-2 flex-wrap">
            {availableLightingTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleFilter('lightingTypes', type)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filters.lightingTypes.includes(type) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Сброс фильтров */}
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
        className="text-sm text-primary-border hover:underline"
      >
        Сбросить все
      </button>
    </div>
  );

  if (loading) return <div className="text-center py-12 text-gray-500">Загрузка товаров...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Ошибка: {error}</div>;

  return (
    <div className="relative">
      {/* Мобильная кнопка */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-primary-border text-white px-4 py-2 rounded-full"
        >
          <FunnelIcon className="h-5 w-5" /> Фильтры
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-72 flex-shrink-0 p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg sticky top-24 h-fit">
          <FiltersPanel />
        </aside>

        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Товаров не найдено</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                        Нет в наличии
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-lg line-clamp-1">{product.name}</h3>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 space-y-0.5">
                      <p>
                        {product.material || 'Гибкий камень'}
                        {product.length && product.height && (
                          <> • {product.length}×{product.height} мм</>
                        )}
                        {product.thickness && <> • {product.thickness} мм</>}
                      </p>
                      {product.additionalInfo && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {product.additionalInfo}
                        </p>
                      )}
                    </div>
                    <p className="text-primary-border font-bold text-xl mt-2">
                      {product.price > 0 ? `${product.price} ₽` : 'Цена по запросу'}
                    </p>
                    <button className="mt-4 w-full rounded-full bg-primary-border/20 py-2 text-primary-border font-semibold hover:bg-primary-border hover:text-white transition-colors">
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Мобильный оверлей */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-gray-900 shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold">Фильтры</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <FiltersPanel />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-primary-border text-white py-2 rounded-full"
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}