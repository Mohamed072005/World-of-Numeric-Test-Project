import { Controller, Get, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Products } from "./product.schema";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";

@Controller()
export class ProductController {

    constructor(
        @Inject('ProductRepositoryInterface') private readonly productRepository: ProductRepositoryInterface,
        @Inject('ProductServiceInterface') private readonly productService: ProductServiceInterface
    ) { }

    @Get('/products')
    async getProducts(): Promise<{ statusCode: number, products: Products[] }> {
        try {
            const products = await this.productRepository.getProducts();
            return {
                statusCode: HttpStatus.OK,
                products: products
            }
        } catch (err: any) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Failed to get the products',
                error: err.message
            },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('/analytics/trending_products')
    async getMostThreeTrendingProducts(): Promise<{ statusCode: number, products: Products[] }> {
        try{            
            const products = await this.productRepository.getMostTrendingProducts();
            return {
                statusCode: HttpStatus.OK,
                products: products
            }
        }catch(err: any){
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Failed to get the products',
                error: err.message
            },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Get('/analytics/category_sales')
    async getThePopularCategoriesByProducts(): Promise<{ statusCode: number, products: Products[] }>{
        try{
            const categorys = await this.productRepository.getSalesDistributionByCategory();
            return {
                statusCode: HttpStatus.OK,
                products: categorys
            }
        }catch(err: any){
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Failed to get the categorys',
                error: err.message
            },
                HttpStatus.BAD_REQUEST
            )
        }
    }
}