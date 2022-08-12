import { sequelize } from "../db.js";
import SQ from "sequelize";
import { Verification } from "./Verification.js";
import bcrypt from "bcrypt";
import { config } from "../config.js";
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    birthNumber: {
      type: "DATE",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    recommendCode: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN(false),
      allowNull: true,
      defaultValue: false,
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

User.beforeCreate(async (user, options) => {
  if (user.password) {
    const hashPassword = await bcrypt.hash(user.password, parseInt(config.bcrypt.saltRounds));
    user.password = hashPassword;
  }
});

//관계 설정
User.hasOne(Verification, {
  foreignKey: "user_id",
});
Verification.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false,
  constraints: true,
  onDelete: "cascade",
});