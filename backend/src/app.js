import "dotenv/config";
import "./database/db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";
import userRouter from "./routers/userRouter.js";
import { config } from "./common/config/config.js";
import { sequelize } from "./database/db.js";

const app = express();
const logger = morgan("dev");
app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.MODE === "development") {
    const openAPIDocument = yaml.load(path.join(process.cwd(), "/src/swagger/swagger.yaml"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
}

// Routers
app.use("/api/users", userRouter);

sequelize.sync().then(() => {
    console.log("mysql is connecting");
    app.listen(config.host.port, () => {
        console.log(`http://localhost:${config.host.port}`);
    });
});

export default app;
