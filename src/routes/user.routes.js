import { Router } from "express";
import { createUser, deleteUsers, getUsers, getUserById, updateUsers } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";


export const userRouter = Router(); //crea un router nuevo y lo exporta. Es el mismo userRouter que el archivo app.js monta con app.use("/api", userRouter)
userRouter.post("/users", createUserValidation, validate,createUser); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req. la ruta completa es /api/users. 

//userRouter.post("/users", body("email").notEmpty().withMessage("el email no debe estar vacio"), body("password").notEmpty().withMessage("la password no debe ser vacia"),validate,createUser); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req. la ruta completa es /api/users. 
//con el body validamos email que no este vacio. Son middlewares. Validate siempre debe estar despues de las validaciones. Ya no son necesarias porque se controlan en la carpeta validations
userRouter.get("/users", getUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.get("/users/:id", getUserById); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.put("/users/:id", updateUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.delete("/users/:id", deleteUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.