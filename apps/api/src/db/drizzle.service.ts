import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  public db: ReturnType<typeof drizzle<typeof schema>>;
  private pool: Pool;

  async onModuleInit() {
    this.pool = new Pool({
      connectionString: 'postgresql://postgres:postgres@localhost:5432/catalog',
    });
    this.db = drizzle(this.pool, { schema });
  }
}