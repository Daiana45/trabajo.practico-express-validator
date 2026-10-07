import { body } from "express-validator"


//las validaciones no llevan coma cuando se separan y van en identacion.
export const createUserValidation = [
 body("name")
 .notEmpty().withMessage("el name no debe estar vacio"),
 body("email")
 .notEmpty().withMessage("la email no debe estar vacia")
 .isEmail().withMessage("el email debe ser valido"),
 body("password").notEmpty().withMessage("la password no debe ser vacio"),
 body("person_id").notEmpty().withMessage("el person_id no debe ser vacio"),
];

export const updateUserValidation = [
    body("name").optional().notEmpty().withMessage("el name no debe ser vacio"),
    body("email")
    .notEmpty().withMessage("el em")
    .isEmail().withMessage(),
    body("password").notEmpty().withMessage(),
    body("person_id").notEmpty().withMessage,
];