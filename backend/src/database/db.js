import SQ from "sequelize";
import { config } from "../common/config/config.js";

const { host, user, database, password, port } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: "mysql",
    logging: false,
    port,
});

