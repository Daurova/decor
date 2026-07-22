import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { products } from '../db/schema';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/catalog',
});
const db = drizzle(pool);

async function importProducts() {
  // 1. Очистить таблицу
  console.log('🧹 Очищаем таблицу products...');
  await db.delete(products);
  console.log('✅ Таблица очищена');

  // 2. Читаем JSON
  const filePath = path.join(__dirname, '../../../api/data/products.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = JSON.parse(fileContent);

  console.log(`📄 Найдено ${records.length} товаров`);

  // 3. Вставляем данные (с новыми полями)
  const productsToInsert = records.map((item: any) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    price: item.price ? parseFloat(item.price) : 0,
    categoryId: item.categoryId || 1,
    imageUrl: item.imageUrl || null,          // ← новое поле
    images: item.images || null,               // ← новое поле
    height: item.height || null,
    length: item.length || null,
    thickness: item.thickness || null,
    additionalInfo: item.additionalInfo || null,
    material: item.material || null,
    color: item.color || null,
    categoryName: item.categoryName || null,
  }));

  const inserted = await db.insert(products).values(productsToInsert).returning();
  console.log(`✅ Импортировано ${inserted.length} товаров`);
  process.exit(0);
}

importProducts().catch((err) => {
  console.error('❌ Ошибка:', err);
  process.exit(1);
});