import { startDB } from "./src/config/database.js";
import express from "express";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRoutes } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";

const app = express(); //guarda en app la funcion que se ejecuta de expressç
const PUERTO = 3000;

//para que entienda el formato json
app.use(express.json());

//configuracion de las rutas, cuando ya tenemos las rutas definidas.
//si o si deben estar para que se creen las tablas.
app.use("/api",userRouter); //si recibe dos parametros primero recibe el de la ruta
app.use("/api", taskRoutes);
app.use("/api", personRouter);
app.use("/api", roleRouter);

app.listen (PUERTO, async() => {
    await startDB()
    console.log(`servidor corriendo en el ${PUERTO}`)
});