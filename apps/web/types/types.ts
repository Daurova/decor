export type Category = 'panels' | 'lighting';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  color: string[];
  material: string;
  size?: string; // для панелей
  style: string[]; // e.g. ['modern', 'minimalism', 'loft']
  lightingType?: string; // для освещения: 'LED', 'pendant', 'track'
  wattage?: number;
  inStock: boolean;
}

export interface FilterState {
  category: Category | 'all';
  colors: string[];
  materials: string[];
  styles: string[];
  lightingTypes: string[];
  priceRange: [number, number];
}