import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
    body("title")
        .notEmpty()
        .withMessage("el titulo no debe estar vacio")
        .isLength({ max: 100 })
        .withMessage("el titulo no puede superar los 100 caracteres")
        .custom(async (title) => {
            const task = await Task.findOne({
                where: { title },
            });

            if (task) {
                throw new Error("el titulo ya existe");
            }

            return true;
        }),

    body("description")
        .notEmpty()
        .withMessage("la descripcion no debe estar vacia")
        .isLength({ max: 100 })
        .withMessage("la descripcion no puede superar los 100 caracteres"),

    body("user_id")
        .notEmpty()
        .withMessage("el user_id no debe estar vacio")
        .isInt({ min: 1 })
        .withMessage("el user_id debe ser un entero positivo")
        .custom(async (user_id) => {
            const user = await UserModel.findByPk(user_id);

            if (!user) {
                throw new Error("el usuario no existe");
            }

            return true;
        }),
];

export const updateTaskValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("el id debe ser un entero positivo")
        .custom(async (id) => {
            const task = await Task.findByPk(id);

            if (!task) {
                throw new Error("la tarea no existe");
            }

            return true;
        }),

    body("title")
        .optional()
        .notEmpty()
        .withMessage("el titulo no debe estar vacio")
        .isLength({ max: 100 })
        .withMessage("el titulo no puede superar los 100 caracteres"),

    body("description")
        .optional()
        .notEmpty()
        .withMessage("la descripcion no debe estar vacia")
        .isLength({ max: 100 })
        .withMessage("la descripcion no puede superar los 100 caracteres"),

    body("user_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("el user_id debe ser un entero positivo")
        .custom(async (user_id) => {
            const user = await UserModel.findByPk(user_id);

            if (!user) {
                throw new Error("el usuario no existe");
            }

            return true;
        })
];

export const idTaskValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("el id debe ser un entero positivo")
        .custom(async (id) => {
            const task = await Task.findByPk(id);

            if (!task) {
                throw new Error("la tarea no existe");
            }

            return true;
        }),
];