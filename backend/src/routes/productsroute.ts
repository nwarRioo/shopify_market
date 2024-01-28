import { Request, Response, Router } from "express";
import { MongoDB, mongoDB } from "../repository/mongoDB";
import express from "express";
import IError from "../interfaces/IError";
import IResponse from "../interfaces/IResponse";
import IProduct from "../interfaces/IProduct";


export class ProductsRoute {
    private repository: MongoDB;
    private router: Router;

    constructor() {
        this.repository = mongoDB;
        this.router = express.Router();
        this.router.get("/", this.getProducts);
    }

    public getRouter = (): Router => {
        return this.router;
    };

    private getProducts = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IProduct[] | IError> = await this.repository.getProducts();
        res.status(response.status).send(response.result);
    };
}