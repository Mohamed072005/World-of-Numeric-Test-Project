import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductsDocument = HydratedDocument<Products>

@Schema()
export class Products {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    category: string

    @Prop({ required: true })
    price: number
}

const ProductSchema = SchemaFactory.createForClass(Products);

ProductSchema.virtual('sales', {
    ref: 'Sales',
    localField: '_id',
    foreignField: 'product'
})

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

ProductSchema.index({ ProductID: 1 });
ProductSchema.index({ category: 1 });

export { ProductSchema }