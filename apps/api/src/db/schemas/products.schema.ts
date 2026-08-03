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
  height: real('height'),
  length: real('length'),
  thickness: real('thickness'),
  additionalInfo: text('additional_info'),
  material: varchar('material', { length: 100 }),
  color: jsonb('color'),
  categoryName: varchar('category_name', { length: 100 }), // ← добавить
  images: jsonb('images'), // ← добавить
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
