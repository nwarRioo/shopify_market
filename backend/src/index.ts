import express, { Express } from "express";
import cors from "cors";
import { mongoDB } from "./repository/mongoDB";

const port = 8000

class App {
    private app: Express
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors())
    }

    public init = async () => {
        try {
            await mongoDB.init();
            process.on('exit', () => mongoDB.close());
            this.app.get('/', (req, res) => {
                res.send('Привет, мир!');
              });

            this.app.listen(port, () => {
                console.log("Server is running on port " + port);
                
            })
        } catch (error) {
            console.log(error);
        }
    }
}

const app = new App();
app.init();