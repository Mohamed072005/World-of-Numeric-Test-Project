import { ApiProperty } from "@nestjs/swagger";

export class SalesErrorResponseDTO {
    @ApiProperty({
        example: 400,
        description: 'HTTP status code'
    })
    statusCode: number;

    @ApiProperty({
        example: 'Failed to get the sales',
        description: 'Error message'
    })
    message: string;

    @ApiProperty({
        example: 'Invalid selectedTime value',
        description: 'Detailed error message'
    })
    error: string;
}