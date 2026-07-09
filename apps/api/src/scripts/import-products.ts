// import-products.ts

// 1. Импортируем нужные модули
import { drizzle } from 'drizzle-orm/node-postgres'; // это наш "переводчик" между кодом и PostgreSQL
import { Pool } from 'pg'; // это драйвер для подключения к PostgreSQL
import { products } from '../db/schema'; // это наша схема таблицы товаров (описание полей)
import * as fs from 'fs'; // модуль для работы с файловой системой (чтение файлов)
import * as path from 'path'; // модуль для работы с путями к папкам/файлам

// 2. Настраиваем подключение к базе данных
const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/catalog',
});
// Это строка подключения: логин:пароль@адрес_сервера:порт/имя_базы
// postgres - логин, postgres - пароль, localhost - наш компьютер, 5432 - порт, catalog - имя базы

const db = drizzle(pool); // создаём объект для работы с БД через Drizzle

// 3. Главная функция, которая делает всю работу
async function importProducts() {
  console.log('🧹 Очищаем таблицу products...');
  // Удаляем все старые записи, чтобы не было дублей
  await db.delete(products);
  console.log('✅ Таблица очищена');

  // 4. Читаем JSON-файл
  const filePath = path.join(__dirname, '../../data/products.json');
  // __dirname - это путь к текущей папке (apps/api/src/scripts)
  // мы поднимаемся наверх на 3 уровня (из scripts в api, потом в apps, потом в decor) и заходим в data/products.json
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // читаем содержимое файла как текст в кодировке UTF-8

  const records = JSON.parse(fileContent);
  // превращаем текст JSON в массив объектов JavaScript

  console.log(`📄 Найдено ${records.length} товаров`);

  // 5. Преобразуем данные под нашу таблицу
  // В нашей схеме products есть поля: name, slug, description, price, categoryId, imageUrl
  // В JSON у нас есть ещё dimensions, thickness, images — их мы пока пропускаем, так как в таблице их нет
  const productsToInsert = records.map((item: any) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    price: item.price ? parseFloat(item.price) : 0,
    categoryId: item.categoryId || 1,
    imageUrl: item.imageUrl || null,
    height: item.height || null,
    length: item.length || null,
    thickness: item.thickness || null,
    additionalInfo: item.additionalInfo || null,
    material: item.material || null,
    color: item.color || null,
    categoryName: item.categoryName || null,
  }));

  // 6. Вставляем данные в базу
  const inserted = await db
    .insert(products)
    .values(productsToInsert)
    .returning();
  // inserting — возвращает вставленные записи с новыми ID

  console.log(`✅ Импортировано ${inserted.length} товаров`);
  process.exit(0); // завершаем программу
}

// 7. Запускаем функцию, если происходит ошибка — выводим её
importProducts().catch((err) => {
  console.error('❌ Ошибка:', err);
  process.exit(1);
});
