import { Inject, Injectable } from "@nestjs/common";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { Products } from "./product.schema";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(@Inject('ProductRepositoryInterface') private readonly productRepository: ProductRepositoryInterface){ }
    getPoductsWithTotalSales(): Promise<Products[]> {
        try{
            const products = this.productRepository.getProducts();
            return products;
        }catch(err: any){
            throw err
        }
    }
}