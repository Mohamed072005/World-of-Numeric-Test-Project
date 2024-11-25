import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SalesTimeParamDTO {
    @ApiProperty({
        example: '7',
        description: 'Number of days to look back for sales data',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    selectedTime: string
}