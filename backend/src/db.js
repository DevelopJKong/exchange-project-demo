import SQ from "sequelize";
import { config } from "./config.js";
// import { Verification } from "./models/Verification.js";
// import { User } from "./models/User.js";

const { host, user, database, password, port } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: "mysql",
    logging: false,
    port,
});

// 
// User.hasMany(Verification, {
//     foreignKey: 'user_id',
//     allowNull: false,
//     constraints: true,
//     onDelete: 'cascade'
// });
// Verification.belongsTo(User, {
//     foreignKey: 'user_id'
// });