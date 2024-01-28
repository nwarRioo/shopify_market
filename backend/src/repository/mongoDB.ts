import mongoose, { Mongoose } from "mongoose";
import IResponse from "../interfaces/IResponse";
import IProduct from "../interfaces/IProduct";
import IError from "../interfaces/IError";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/Product";

const mongoClientUrl = "mongodb://localhost/shopifyDB"

export class MongoDB {
    private client: Mongoose | null = null;
    public init = async () => {
        this.client = await mongoose.connect(mongoClientUrl);
        console.log("MongoDB is connected")
    }
    public close = async (): Promise<void> => {
        if (!this.client) return;
        await this.client.disconnect();
    };

    public getProducts = async (): Promise<IResponse<IProduct[] | IError>> => {
        try {
            const products = await Product.find();
            return {
                status: StatusCodes.OK,
                result: products
            };
        } catch (err) {
            const error = err as Error;
            return {
                status: StatusCodes.BAD_REQUEST,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        };
    };
}

export const mongoDB = new MongoDB();