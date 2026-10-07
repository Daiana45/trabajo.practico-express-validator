import { Router } from "express";

import {
    createRole,
    getRoles
} from "../controllers/role.controller.js";

import { validate } from "../middlewares/validate.js";

import {
    createRoleValidation
} from "../middlewares/validations/role.validate.js";

export const roleRouter = Router();

roleRouter.post(
    "/roles",
    createRoleValidation,
    validate,
    createRole
);

roleRouter.get(
    "/roles",
    getRoles
);