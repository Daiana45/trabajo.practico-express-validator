import { Router } from "express";
import {createTask, getTask, getTasksById, deleteTask, updateTask } from "../controllers/task.controller.js"

export const taskRoutes = Router();
taskRoutes.post("/", createTask); //router.post responde al metodo http post(crear).
taskRoutes.get("/", getTask);
taskRoutes.get("/:id",getTasksById);
taskRoutes.delete("/:id", deleteTask); //introduce al metodo delete, id el numero del usuario viene en la URL y deleteuser es la funcion que se ejecuta.
taskRoutes.put("/:id", updateTask);