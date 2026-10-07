import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "",{
    host: "localhost",
    dialect: "mysql"
});

//testeamos la conexion.
export const startDB = async() => {
    try{
    await sequelize.authenticate();
    await sequelize.sync({force:false});//puede estar aunque authenticathe tambien ya se encarga de lo mismo, es para la creacion de las tablas.
    console.log("conexion a la base de datos");
} catch(error) {
    console.log("error al conectarse al servidor:", error);
}
}
