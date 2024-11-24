import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sales, SalesSchema } from "./sales.schema";
import { SalesController } from "./sales.controller";
import { SalesRepository } from "./sales.repository";
import { SalesService } from "./sales.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Sales.name, schema: SalesSchema }])],
    controllers: [SalesController],
    providers: [
        {
            provide: 'SalesRepositoryInterface',
            useClass: SalesRepository
        },
        {
            provide: 'SalesServiceInterface',
            useClass: SalesService
        }
    ]
})

export class SalesModule { }