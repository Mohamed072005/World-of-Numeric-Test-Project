import { ApiProperty } from "@nestjs/swagger"
import { Products } from "../product.schema"

export class ProductsResponseDTO {
    @ApiProperty({
        example: 200,
        description: 'HTTP Status Code'
    })
    statusCode: number

    @ApiProperty({
        example: [
            {
                _id: "674070dddf39463c6e8fa1df",
                name: "Scarf",
                category: "Clothing",
                totalRevenue: 6756896.399999999,
                salesDate: "2024-08-30T00:00:00.000Z"
            }
        ],
        description: 'Products'
    })
    products: Products[]
}