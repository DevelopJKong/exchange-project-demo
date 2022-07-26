import "dotenv/config";
import "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { config } from "./config.js";
import { sequelize } from "./db.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const logger = morgan("dev");

app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routers
app.use("/users",userRouter);


sequelize.sync().then(() => {
    console.log("mysql is connecting");
    app.listen(config.host.port, () => {
        console.log(`http://localhost:${config.host.port}`);
    });
});

export default app;
