import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DrizzleService } from '../db/drizzle.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DrizzleService],
})
export class ProductsModule {}