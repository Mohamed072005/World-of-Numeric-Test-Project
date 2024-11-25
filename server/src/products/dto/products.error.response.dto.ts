import { ApiProperty } from "@nestjs/swagger"

export class ProductsErrorResponseDTO {
    @ApiProperty({
        example: 400,
        description: 'HTTP Status Code'
    })
    statusCode: number

    @ApiProperty({
        example: 'Failed to get the products',
        description: 'Error Message'
    })
    message: string

    @ApiProperty({
        example: 'Network error',
        description: 'Error Message'
    })
    error: string
}