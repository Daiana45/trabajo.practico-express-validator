import { DataTypes } from "sequelize"; //
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define(
    "User", //si el de arriba esta en mayuscula.
    {
        name:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            unique:true,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        person_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique: true,
            references:{
                model: "Person",
                key: "id",
            },
        },
    }
);

//relaciones
//uno a uno
UserModel.belongsTo(PersonModel, {foreignKey: "person_id", as:
    "owner"
});

//una persona puedde tener un usuario.
PersonModel.hasOne(UserModel, {foreignKey:"person_id", as:
    "user"
});