import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { products } from '../db/schema';
import { faker } from '@faker-js/faker';
import { sql } from 'drizzle-orm';

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/catalog',
});
const db = drizzle(pool);

async function seed() {
  console.log('🌱 Очищаем таблицу products...');
  await db.execute(sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE;`);
  console.log('✅ Таблица очищена');

  console.log('🌱 Заполняем базу 200 тестовыми товарами...');

  const mockProducts: (typeof products.$inferInsert)[] = [];

  for (let i = 0; i < 200; i++) {
    const categoryId = Math.floor(Math.random() * 5) + 1;
    // Генерируем уникальное имя, чтобы уменьшить вероятность коллизии slug
    const name =
      faker.commerce.productName() + ' ' + faker.string.alphanumeric(4);
    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    // Добавляем случайный суффикс для полной гарантии уникальности
    slug = `${slug}-${faker.string.alphanumeric(4)}`;

    mockProducts.push({
      name,
      slug,
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      categoryId,
      imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    });
  }

  // Вставка пакетами по 50, чтобы избежать слишком большого запроса (опционально)
  const batchSize = 50;
  for (let i = 0; i < mockProducts.length; i += batchSize) {
    const batch = mockProducts.slice(i, i + batchSize);
    await db.insert(products).values(batch);
    console.log(`📦 Вставлена партия ${i / batchSize + 1}`);
  }

  console.log(`✅ Добавлено ${mockProducts.length} товаров`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Ошибка:', err);
  process.exit(1);
});
