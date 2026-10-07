import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const RoleModel = sequelize.define(
    "Role",
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    }
);