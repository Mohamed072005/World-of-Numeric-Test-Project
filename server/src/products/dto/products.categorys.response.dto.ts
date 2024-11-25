import { ApiProperty } from "@nestjs/swagger"
import { Products } from "../product.schema"
import { CategorySalesResult } from "../interfaces/category.interface"

export class ProductsCategorysResponseDTO {
    @ApiProperty({
        example: 400,
        description: 'HTTP Status Code'
    })
    statusCode: number

    @ApiProperty({
        example: [
            {
                category: "Sports & Outdoors",
                totalSales: 320690,
                percentage: 20.08143032835133
            }
        ],
        description: 'Categorys and there Sales and percentage'
    })
    categorys: CategorySalesResult[]
}