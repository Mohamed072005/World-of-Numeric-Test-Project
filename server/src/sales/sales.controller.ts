import { Controller, Get, HttpException, HttpStatus, Inject, Param } from "@nestjs/common";
import { SalesRepositoryInterface } from "./interfaces/sales.repository.interface";
import { SalesServiceInterface } from "./interfaces/sales.service.interface";
import { ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SalesResponseDTO } from "./dto/sales.response.dto";
import { SalesErrorResponseDTO } from "./dto/sales.error.response.dto";
import { SalesTimeParamDTO } from "./dto/sales.time.param.dto";

@ApiTags('Sales Analytics')
@ApiExtraModels(SalesResponseDTO, SalesErrorResponseDTO)
@Controller()
export class SalesController {
    constructor(
        @Inject('SalesRepositoryInterface') private readonly salesRepository: SalesRepositoryInterface,
        @Inject('SalesServiceInterface') private readonly salesService: SalesServiceInterface
    ) { }

    @Get('/analytics/total_sales/:selectedTime')
    @ApiOperation({
        summary: 'Get total sales for a specific time period',
        description: 'Retrieves the total sales amount for a specified number of days in the past. The selectedTime parameter represents the number of days to look back.'
    })
    @ApiParam({
        name: 'selectedTime',
        required: true,
        description: 'Number of days to look back (must be a positive number)',
        schema: { type: 'string' },
        example: '7'
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved total sales',
        type: SalesResponseDTO
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request - Invalid selectedTime parameter or processing error',
        type: SalesErrorResponseDTO
    })
    async getSalesByTime(@Param() param: SalesTimeParamDTO): Promise<SalesResponseDTO> {
        try {
            const selectedTime = parseInt(param.selectedTime, 10);
            if(isNaN(selectedTime) || selectedTime < 0){
                throw new Error('Invalid selectedTime value');
            }
            const newDate = this.salesService.handelDate(selectedTime)
            const sales = await this.salesRepository.getTheTotalSalse(newDate);
            
            return {
                sales: sales,
            }
        } catch (err: any) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Failed to get the sales',
                error: err.message,
            }, 
            HttpStatus.BAD_REQUEST
        );
        }
    }
}