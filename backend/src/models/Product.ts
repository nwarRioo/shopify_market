import mongoose, { Schema } from "mongoose";
import IProduct from "../interfaces/IProduct";

const ProductSchema: Schema = new Schema<IProduct>({
    id: String,
    bodyHtml: String,
    image: String
}, {
    versionKey: false
});



export const Product = mongoose.model<IProduct>('Product', ProductSchema);