import mongoose, { Mongoose } from "mongoose";

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
}

export const mongoDB = new MongoDB();