import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const Task = sequelize.define("task", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true, //crea un modelo de sequelize
},
    title:{
        type: DataTypes.STRING(100),
        allowNull:false, //no debe tener un valor nulo.
        unique: true, //debe ser unico.
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, //es el valor si no se envia el campo.
    },
    user_id:{ //para pasar de task -> user, una tarea debe saber a que usuario pertenece
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //es referents es opcional. Cunado tenemos autorizacion y validacion:
    //user_id:{ type:datatypes.integer, allownul:false, reference{models:"users", key:"id"}}} Cuando tenemos una relacion de uno a uto si va unique //si esto lo tenemos cuando desestructuramos en los controllers
});

//relaciones
//relaciones uno a muchos.
//belongsTo significa pertenece a 
//foreignKey cual es la columna que conecta a ambas tablas.
Task.belongsTo(UserModel, {ForeignKeys: "user_id", as:
    "author"}); //el as es un alias

    //hasmany muchas tareas
UserModel.hasMany(Task, {ForeingKeys: "user_id", as:
    "tareas"});
