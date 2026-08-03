// web/app/products/[slug]/components/ProductAttributes.tsx
'use client';

interface ProductAttributesProps {
  product: {
    length: number | null;
    height: number | null;
    thickness: number | null;
    material: string | null;
    color: string[];
    style: string[];
    lightingType: string | null;
  };
}

export function ProductAttributes({ product }: ProductAttributesProps) {
  // Собираем все характеристики в массив
  const attributes = [
    { label: 'Длина', value: product.length ? `${product.length} мм` : null },
    { label: 'Высота', value: product.height ? `${product.height} мм` : null },
    { label: 'Толщина', value: product.thickness ? `${product.thickness} мм` : null },
    { label: 'Материал', value: product.material || null },
    { label: 'Цвет', value: product.color?.length > 0 ? product.color.join(', ') : null },
    { label: 'Стиль', value: product.style?.length > 0 ? product.style.join(', ') : null },
    { label: 'Тип освещения', value: product.lightingType || null },
  ];

  // Фильтруем только те, у которых есть значение
  const visibleAttributes = attributes.filter(attr => attr.value);

  // Если нет ни одной характеристики — ничего не показываем
  if (visibleAttributes.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-surface/50 rounded-xl border border-border/20">
      <h3 className="font-heading font-semibold text-secondary mb-3">
        Характеристики
      </h3>
      <dl className="flex flex-col gap-1 text-sm">
        {visibleAttributes.map((attr) => (
          <div 
            key={attr.label} 
            className="flex justify-between py-2 border-b border-border/10 last:border-0"
          >
            <dt className="text-secondary/60">{attr.label}</dt>
            <dd className="text-secondary font-medium">{attr.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}