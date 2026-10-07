import { Router } from "express";
import {createTask, getTask, getTasksById, deleteTask, updateTask } from "../controllers/task.controller.js"
import {
    createTaskValidation,
    idTaskValidation, updateTaskValidation
} from "../middlewares/validations/task.validate.js";
import { validate } from "../middlewares/validate.js";

export const taskRoutes = Router();
taskRoutes.post(
    "/",
    createTaskValidation,
    validate,
     createTask); //router.post responde al metodo http post(crear).
taskRoutes.get(
    "/",
     getTask);
taskRoutes.get(
    "/:id",
    idTaskValidation,
    validate,
    getTasksById);
taskRoutes.delete(
    "/:id",
    idTaskValidation,
    validate,
     deleteTask); //introduce al metodo delete, id el numero del usuario viene en la URL y deleteuser es la funcion que se ejecuta.
taskRoutes.put(
    "/:id", 
    updateTaskValidation,
    validate,
    updateTask);