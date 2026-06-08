// apps/api/src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { products } from '../db/schema';
import { eq, ilike, and, sql, count, SQL } from 'drizzle-orm';
import { desc, asc } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(private drizzle: DrizzleService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 12,
      search,
      categoryId,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    const offset = (page - 1) * limit;
    const whereConditions: SQL[] = [];

    if (search) {
      whereConditions.push(ilike(products.name, `%${search}%`));
    }
    if (categoryId) {
      whereConditions.push(eq(products.categoryId, categoryId));
    }
    if (minPrice !== undefined) {
      whereConditions.push(sql`${products.price} >= ${String(minPrice)}`);
    }
    if (maxPrice !== undefined) {
      whereConditions.push(sql`${products.price} <= ${String(maxPrice)}`);
    }

    const whereClause = whereConditions.length
      ? and(...whereConditions)
      : undefined;

    // Сортировка
    const orderBy =
      sortOrder === 'asc' ? asc(products[sortBy]) : desc(products[sortBy]);

    const data = await this.drizzle.db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const totalResult = await this.drizzle.db
      .select({ value: count() })
      .from(products)
      .where(whereClause);
    const total = totalResult[0]?.value ?? 0;

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  // Остальные методы (findOne, create, update, delete) остаются без изменений
  async findOne(id: number) {
    const result = await this.drizzle.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return result[0];
  }

  async create(data: any) {
    const result = await this.drizzle.db
      .insert(products)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await this.drizzle.db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    await this.drizzle.db.delete(products).where(eq(products.id, id));
    return { deleted: true };
  }
}
