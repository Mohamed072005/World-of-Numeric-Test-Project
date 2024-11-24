import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose';
import { SalesModule } from './sales/sales.module';
import { ProductModule } from './products/product.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    SalesModule,
    ProductModule
  ],
})
export class AppModule {}
