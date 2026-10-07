import { Router } from "express";

import {
    createPerson,
    getPersons
} from "../controllers/person.controller.js";

import { validate } from "../middlewares/validate.js";

import {
    createPersonValidation
} from "../middlewares/validations/person.validate.js";

export const personRouter = Router();

personRouter.post(
    "/persons",
    createPersonValidation,
    validate,
    createPerson
);

personRouter.get(
    "/persons",
    getPersons
);