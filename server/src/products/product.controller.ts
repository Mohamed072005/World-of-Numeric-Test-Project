import { Controller, Get, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductsResponseDTO } from "./dto/products.response.dto";
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductsErrorResponseDTO } from "./dto/products.error.response.dto";
import { ProductsCategorysResponseDTO } from "./dto/products.categorys.response.dto";
import { ProductsCategorysErrorResponseDTO } from "./dto/products.categorys.error.response.dto";

@ApiTags('Products Analytics')
@ApiExtraModels(ProductsResponseDTO, ProductsErrorResponseDTO, ProductsCategorysResponseDTO, ProductsCategorysErrorResponseDTO)
@Controller()
export class ProductController {

    constructor(
        @Inject('ProductRepositoryInterface') private readonly productRepository: ProductRepositoryInterface,
    ) { }

    @Get('/products')
    @ApiOperation({
        summary: 'Get Products', 
        description: 'Retrieves the Products and there info like, the name of the product and his price and the created date and the category'
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved the Products',
        type: ProductsResponseDTO
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Failed to get the Products',
        type: ProductsErrorResponseDTO
    })
    async getProducts(): Promise<ProductsResponseDTO> {
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
    @ApiOperation({
        summary: 'Get Products', 
        description: 'Retrieves the top 3 trending Products'
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved the Products',
        type: ProductsResponseDTO
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Failed to get the Products',
        type: ProductsErrorResponseDTO
    })
    async getMostThreeTrendingProducts(): Promise<ProductsResponseDTO> {
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
    @ApiOperation({
        summary: 'Get Categories', 
        description: 'Retrieved the percentage of the categories by the products sales'
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved the percentage of the categories by the products sales',
        type: ProductsCategorysResponseDTO
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Failed to get the Categories',
        type: ProductsCategorysErrorResponseDTO
    })
    async getThePopularCategoriesByProducts(): Promise<ProductsCategorysResponseDTO>{
        try{
            const categorys = await this.productRepository.getSalesDistributionByCategory();
            return {
                statusCode: HttpStatus.OK,
                categorys: categorys
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