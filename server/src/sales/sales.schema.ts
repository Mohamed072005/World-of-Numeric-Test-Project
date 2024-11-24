import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SalesDocument = HydratedDocument<Sales>;

@Schema()
export class Sales {
    @Prop({ type: Types.ObjectId, ref: 'Products',  required: true })
    product: Types.ObjectId

    @Prop({ required: true })
    quantity: number

    @Prop({ required: true })
    date: Date

    @Prop({ required: true })
    total: number
}

export const SalesSchema = SchemaFactory.createForClass(Sales);

SalesSchema.index({ product: 1 });
SalesSchema.index({ date: 1 });
SalesSchema.index({ quantity: 1 });