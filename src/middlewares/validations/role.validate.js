import { body } from "express-validator";
import { RoleModel } from "../../models/role.model.js";

export const createRoleValidation = [
    body("name")
        .notEmpty()
        .withMessage("el nombre del rol no debe estar vacio")
        .isLength({ max: 50 })
        .withMessage("el nombre del rol no puede superar los 50 caracteres")
        .custom(async (name) => {
            const role = await RoleModel.findOne({
                where: { name }
            });

            if (role) {
                throw new Error("el rol ya existe");
            }

            return true;
        })
];