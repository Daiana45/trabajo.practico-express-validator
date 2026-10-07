import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

export const UserRoleModel = sequelize.define(
    "User_Role", 
    {
//si se quiere definir el id
id:{
    type:DataTypes.INTEGER,
    primaryKey:true, //indica que el id es la clave primaria
    //allowNull:false,
    //unique: true,
    autoIncrement: true,
},
user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);

//relaciones
//muchos a muchos
//troungh se relacionan a traves de
UserModel.belongsToMany(RoleModel,{
    through: UserRoleModel,
    foreignKey: "user_id",
    as:"roles"
} );

RoleModel.belongsToMany(UserModel,{
    through: UserRoleModel,
    foreignKey: "role_id",
    as: "users",
});

//Sequelize usa through para decir la relacion entre User y Role se hace mediante UserRoleModel