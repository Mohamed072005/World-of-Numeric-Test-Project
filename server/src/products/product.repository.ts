import { Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { Products } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductsCategorysResponseDTO } from "./dto/products.categorys.response.dto";
import { CategorySalesResult } from "./interfaces/category.interface";

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {

    constructor(@InjectModel(Products.name) private readonly productModule: Model<Products>) { }

    async getProducts(): Promise<Products[]> {
        const products = await this.productModule.aggregate([
            {
                $lookup: {
                    from: 'sales',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'sales',
                },
            },
            {
                $unwind: '$sales',
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    category: { $first: '$category' },
                    totalRevenue: { $sum: { $multiply: ['$price', '$sales.quantity'] } },
                    salesDate: { $first: '$sales.date' },
                },
            },
        ]);
        return products;
    }

    async getMostTrendingProducts(): Promise<Products[]> {
        return await this.productModule.aggregate([
            {
                $lookup: {
                    from: "sales",
                    localField: '_id',
                    foreignField: 'product',
                    as: 'sales'
                },
            },
            {
                $unwind: '$sales'
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    totalRevenue: { $sum: { $multiply: ['$price', '$sales.quantity'] } },
                    salesCount: { $sum: 1 },
                },
            },
            {
                $sort: { salesCount: -1 },
            },
            {
                $limit: 3
            }
        ])
    }

    async getSalesDistributionByCategory(): Promise<CategorySalesResult[]> {
        const distribution = await this.productModule.aggregate([
            {
                $lookup: {
                    from: 'sales',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'sales',
                },
            },
            {
                $unwind: '$sales',
            },
            {
                $group: {
                    _id: '$category',
                    totalSales: { $sum: '$sales.quantity' },
                },
            },
            {
                $group: {
                    _id: null,
                    categories: {
                        $push: {
                            category: '$_id',
                            totalSales: '$totalSales',
                        },
                    },
                    globalSales: { $sum: '$totalSales' },
                },
            },
            {
                $unwind: '$categories',
            },
            {
                $project: {
                    _id: 0,
                    category: '$categories.category',
                    totalSales: '$categories.totalSales',
                    percentage: {
                        $multiply: [
                            { $divide: ['$categories.totalSales', '$globalSales'] },
                            100,
                        ],
                    },
                },
            },
            {
                $sort: { percentage: -1 },
            },
        ]);

        return distribution as CategorySalesResult[]
    }
}