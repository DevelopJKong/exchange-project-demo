import { sequelize } from "../db.js";
import SQ from "sequelize";
const DataTypes = SQ.DataTypes;

export const Verification = sequelize.define(
    "verification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            field: "createdAt",
            type: "TIMESTAMP",
            defaultValue: SQ.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        updatedAt: {
            field: "updatedAt",
            type: "TIMESTAMP",
            defaultValue: SQ.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
    },
    { timestamps: false }
);
