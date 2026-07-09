import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
  real,
  jsonb,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id'),
  imageUrl: varchar('image_url', { length: 512 }),
  height: real('height'), // высота в мм
  length: real('length'), // длина в мм
  thickness: real('thickness'), // толщина в мм
  additionalInfo: text('additional_info'), // доп. информация (цвет, фактура)
  material: varchar('material', { length: 100 }), // материал
  color: jsonb('color'), // массив цветов или строка
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
