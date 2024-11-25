import { ApiProperty } from "@nestjs/swagger";

export class SalesResponseDTO {
    @ApiProperty({
        example: 1500.50,
        description: 'Total sales amount for the selected time period',
        type: Number
    })
    sales: number;
}