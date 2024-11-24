import { Controller, Get, HttpException, HttpStatus, Inject, Param } from "@nestjs/common";
import { SalesRepositoryInterface } from "./interfaces/sales.repository.interface";
import { SalesServiceInterface } from "./interfaces/sales.service.interface";

@Controller()
export class SalesController {
    constructor(
        @Inject('SalesRepositoryInterface') private readonly salesRepository: SalesRepositoryInterface,
        @Inject('SalesServiceInterface') private readonly salesService: SalesServiceInterface
    ) { }

    @Get('/analytics/total_sales/:selectedTime')
    async getSalesByTime(@Param() param: {selectedTime: string | null}): Promise<{sales: number}> {
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