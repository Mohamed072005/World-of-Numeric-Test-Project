import { Products } from "../product.schema";

export interface ProductRepositoryInterface {
    getProducts(): Promise<Products[]>
    getMostTrendingProducts(): Promise<Products[]>
    getSalesDistributionByCategory(): Promise<Products[]>
}