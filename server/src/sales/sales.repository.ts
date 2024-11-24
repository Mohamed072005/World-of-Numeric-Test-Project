import { InjectModel } from "@nestjs/mongoose";
import { SalesRepositoryInterface } from "./interfaces/sales.repository.interface";
import { Sales } from "./sales.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SalesRepository implements SalesRepositoryInterface {
    constructor(@InjectModel(Sales.name) private readonly salesModel: Model<Sales>) { }

    async getTheTotalSalse(selectedTime: string): Promise<number> {
        return await this.salesModel.countDocuments({
            date: {
                $gt: new Date(selectedTime)
            },
        });
    }
}