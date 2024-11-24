import { Injectable } from "@nestjs/common";
import { SalesServiceInterface } from "./interfaces/sales.service.interface";

@Injectable()
export class SalesService implements SalesServiceInterface {
    handelDate(selectedTime: number | null): string {
        try{
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - selectedTime);
            const finalDate = currentDate.toISOString();
            return finalDate;
        }catch(err: any){
            throw err
        }
    }
}