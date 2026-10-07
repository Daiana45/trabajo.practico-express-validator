import { Router } from "express";
import {
    createPerson,
    getPersons
} from "../controllers/person.controller.js";

export const personRouter = Router();

personRouter.post("/persons", createPerson);

personRouter.get("/persons", getPersons);