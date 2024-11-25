import { ProductsCategorysResponseDTO } from "../dto/products.categorys.response.dto";
import { Products } from "../product.schema";
import { CategorySalesResult } from "./category.interface";

export interface ProductRepositoryInterface {
    getProducts(): Promise<Products[]>
    getMostTrendingProducts(): Promise<Products[]>
    getSalesDistributionByCategory(): Promise<CategorySalesResult[]>
}