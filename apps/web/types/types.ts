export type Category = 'panels' | 'lighting';

// types/types.ts
export interface Product {
  id: string;
  name: string;
  slug?: string;                 // для ссылок (опционально)
  categoryId?: number;           // числовой ID категории
  categoryName: string;          // название категории (используется в фильтрах)
  price: number;
  image: string;
  color: string[];               // массив цветов
  material: string;
  height?: number | null;        // высота в мм
  length?: number | null;        // длина в мм
  thickness?: number | null;     // толщина в мм (заменяет width)
  additionalInfo?: string;       // доп. информация (цвет, фактура и т.д.)
  inStock: boolean;
  style?: string[];              // стили (на будущее)
  lightingType?: string | null;  // тип освещения (на будущее)
  wattage?: number;              // мощность (на будущее)
}


export interface FilterState {
  category: string;
  colors: string[];
  materials: string[];
  styles: string[];
  lightingTypes: string[];
  priceRange: [number, number];
  // Новые поля для размеров
  lengthRange: [number, number];
  heightRange: [number, number];
  thicknessRange: [number, number];
}