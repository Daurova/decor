import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(private drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db.select().from(products);
  }

  async findOne(id: number) {
    const result = await this.drizzle.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async create(data: any) {
    const result = await this.drizzle.db.insert(products).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await this.drizzle.db.update(products).set(data).where(eq(products.id, id)).returning();
    return result[0];
  }

  async delete(id: number) {
    await this.drizzle.db.delete(products).where(eq(products.id, id));
    return { deleted: true };
  }
}