import { Module } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Products, ProductSchema } from "./product.schema";
import { ProductController } from "./product.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'ProductRepositoryInterface',
            useClass: ProductRepository
        }
    ]
})

export class ProductModule { }