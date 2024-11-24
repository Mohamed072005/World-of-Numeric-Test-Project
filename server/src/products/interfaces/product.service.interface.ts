import { Products } from "../product.schema";

export interface ProductServiceInterface {
    getPoductsWithTotalSales(): Promise<Products[]>
}