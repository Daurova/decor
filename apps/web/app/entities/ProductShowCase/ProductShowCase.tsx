'use client';

import { useState, useMemo } from 'react';
import { Product, FilterState, Category } from '../../../types/types';
import Image from 'next/image';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Заглушка данных (в реальности приходят из БД)
const products: Product[] = [
  // Панели
  { id: 'p1', name: '3D Волны', category: 'panels', price: 89, image: '/products/panel-wave.jpg', color: ['white', 'beige'], material: 'MDF', size: '500x500mm', style: ['modern', 'scandinavian'], inStock: true },
  { id: 'p2', name: 'Кирпичная кладка', category: 'panels', price: 112, image: '/products/panel-brick.jpg', color: ['brown', 'gray'], material: 'Гипс', size: '700x300mm', style: ['loft', 'industrial'], inStock: true },
  { id: 'p3', name: 'Деревянные рейки', category: 'panels', price: 145, image: '/products/panel-wood.jpg', color: ['wood', 'walnut'], material: 'Массив', size: '2400x100mm', style: ['eco', 'japandi'], inStock: false },
  // Освещение
  { id: 'l1', name: 'Подвесной светильник Atom', category: 'lighting', price: 199, image: '/products/light-atom.jpg', color: ['black', 'gold'], material: 'Металл', style: ['modern', 'minimalism'], lightingType: 'pendant', wattage: 40, inStock: true },
  { id: 'l2', name: 'LED-панель Backlight', category: 'lighting', price: 59, image: '/products/light-led.jpg', color: ['white'], material: 'Пластик', style: ['high-tech'], lightingType: 'LED', wattage: 24, inStock: true },
];

// Извлечение уникальных значений для фильтров
const getUniqueValues = (products: Product[], key: keyof Product) => {
  if (key === 'color' || key === 'style') {
    const values = products.flatMap(p => p[key] as string[]);
    return [...new Set(values)];
  }
  if (key === 'material') return [...new Set(products.map(p => p.material))];
  if (key === 'lightingType') return [...new Set(products.filter(p => p.lightingType).map(p => p.lightingType as string))];
  return [];
};

export function ProductShowcase() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    colors: [],
    materials: [],
    styles: [],
    lightingTypes: [],
    priceRange: [0, 300],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Получаем доступные опции на основе товаров (для упрощения — из всех)
  const availableColors = getUniqueValues(products, 'color');
  const availableMaterials = getUniqueValues(products, 'material');
  const availableStyles = getUniqueValues(products, 'style');
  const availableLightingTypes = getUniqueValues(products, 'lightingType');

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.colors.length && !product.color.some(c => filters.colors.includes(c))) return false;
      if (filters.materials.length && !filters.materials.includes(product.material)) return false;
      if (filters.styles.length && !product.style.some(s => filters.styles.includes(s))) return false;
      if (filters.lightingTypes.length && (!product.lightingType || !filters.lightingTypes.includes(product.lightingType))) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      return true;
    });
  }, [filters]);

  const toggleFilter = (arrayKey: keyof Pick<FilterState, 'colors' | 'materials' | 'styles' | 'lightingTypes'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].includes(value) ? prev[arrayKey].filter(v => v !== value) : [...prev[arrayKey], value],
    }));
  };

  // Боковая панель фильтров (общая для десктопа и мобильного оверлея)
  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Категория */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Категория</h3>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'panels', 'lighting'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
              className={`px-3 py-1 rounded-full text-sm transition-all ${filters.category === cat ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              {cat === 'all' ? 'Все' : cat === 'panels' ? 'Декоративные панели' : 'Освещение'}
            </button>
          ))}
        </div>
      </div>
      {/* Цвета */}
      {availableColors.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Цвет</h3>
          <div className="flex gap-2 flex-wrap">
            {availableColors.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter('colors', color)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${filters.colors.includes(color) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Материал */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Материал</h3>
        <div className="flex gap-2 flex-wrap">
          {availableMaterials.map(mat => (
            <button key={mat} onClick={() => toggleFilter('materials', mat)} className={`px-3 py-1 rounded-full text-sm transition-all ${filters.materials.includes(mat) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {mat}
            </button>
          ))}
        </div>
      </div>
      {/* Стиль */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Стиль</h3>
        <div className="flex gap-2 flex-wrap">
          {availableStyles.map(style => (
            <button key={style} onClick={() => toggleFilter('styles', style)} className={`px-3 py-1 rounded-full text-sm transition-all ${filters.styles.includes(style) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {style}
            </button>
          ))}
        </div>
      </div>
      {/* Тип освещения (если выбрана категория lighting или all) */}
      {(filters.category === 'lighting' || filters.category === 'all') && availableLightingTypes.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold mb-3">Тип освещения</h3>
          <div className="flex gap-2 flex-wrap">
            {availableLightingTypes.map(type => (
              <button key={type} onClick={() => toggleFilter('lightingTypes', type)} className={`px-3 py-1 rounded-full text-sm transition-all ${filters.lightingTypes.includes(type) ? 'bg-primary-border text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {type === 'pendant' ? 'Подвесной' : type === 'LED' ? 'LED-панель' : 'Трековый'}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Ценовой диапазон (упрощённо два поля) */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Цена, ₽</h3>
        <div className="flex gap-2 items-center">
          <input type="number" value={filters.priceRange[0]} onChange={e => setFilters(prev => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))} className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800" placeholder="от" />
          <span>—</span>
          <input type="number" value={filters.priceRange[1]} onChange={e => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))} className="w-20 rounded-lg border p-1 text-sm dark:bg-gray-800" placeholder="до" />
        </div>
      </div>
      {/* Сброс фильтров */}
      <button onClick={() => setFilters({ category: 'all', colors: [], materials: [], styles: [], lightingTypes: [], priceRange: [0, 300] })} className="text-sm text-primary-border hover:underline">Сбросить все</button>
    </div>
  );

  return (
    <div className="relative">
      {/* Мобильная кнопка открыть фильтры */}
      <div className="lg:hidden mb-4">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-primary-border text-white px-4 py-2 rounded-full">
          <FunnelIcon className="h-5 w-5" /> Фильтры
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Десктопная боковая панель */}
        <aside className="hidden lg:block w-72 flex-shrink-0 p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg sticky top-24 h-fit">
          <FiltersPanel />
        </aside>

        {/* Сетка товаров */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Товаров не найдено</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">Нет в наличии</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.material} • {product.size || product.lightingType}</p>
                    <p className="text-primary-border font-bold text-xl mt-2">{product.price} ₽</p>
                    <button className="mt-4 w-full rounded-full bg-primary-border/20 py-2 text-primary-border font-semibold hover:bg-primary-border hover:text-white transition-colors">Подробнее</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Мобильный оверлей фильтров */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white dark:bg-gray-900 shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold">Фильтры</h2>
              <button onClick={() => setMobileFiltersOpen(false)}><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <FiltersPanel />
            <button onClick={() => setMobileFiltersOpen(false)} className="mt-6 w-full bg-primary-border text-white py-2 rounded-full">Применить</button>
          </div>
        </div>
      )}
    </div>
  );
}