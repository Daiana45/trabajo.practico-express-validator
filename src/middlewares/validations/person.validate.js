import { body } from "express-validator";
import { PersonModel } from "../../models/person.model.js";

export const createPersonValidation = [
    body("name")
        .notEmpty()
        .withMessage("el nombre no debe estar vacio")
        .isLength({ max: 100 })
        .withMessage("el nombre no puede superar los 100 caracteres"),

    body("Lastname")
        .notEmpty()
        .withMessage("el apellido no debe estar vacio")
        .isLength({ max: 100 })
        .withMessage("el apellido no puede superar los 100 caracteres")
        //.custom() permite crear una regla de validacion personalizada, async permite esperar la consulta, lastname el valor, {re} permite acceder a la peticion completa, findone busca una persona y trhow ner error() hace que registre un error si ya existe una persona, return true la validacion paso correctamente
        .custom(async (Lastname, { req }) => {
            const person = await PersonModel.findOne({
                where: {
                    name: req.body.name,
                    Lastname
                }
            });

            if (person) {
                throw new Error("la persona ya esta registrada");
            }

            return true;
        })
];