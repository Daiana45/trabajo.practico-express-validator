import { body, param } from "express-validator" //param para agregar IsInt
//param datos que vienen de la URL
import { PersonModel } from "../../models/person.model.js";
import { UserModel } from "../../models/user.model.js";
import { UserRoleModel } from "../../models/user_role.model.js";

//las validaciones no llevan coma cuando se separan y van en identacion.
export const createUserValidation = [ //un array de validaciones para cuando se crea un usuario.
 body("name")
 .notEmpty()
 .withMessage("el name no debe estar vacio")
 .isLength({max:100})
 .withMessage("el name no puede superar los 100 caracteres"),
 body("email")
 .notEmpty()
 .withMessage("la email no debe estar vacia")
 .isEmail()
 .withMessage("el email debe ser valido") //debe tener formato email
 .custom(async(email) => {
    const user = await UserModel.findOne({
        where:{email},
    });
    if (user) {
        throw new Error("el email ya esta registrado");
    }
    return true;
 }),

 body("password")
 .notEmpty()
 .withMessage("la password no debe ser vacio")
 .isLength({min:6, max:100})
 .withMessage("la password debe tener entre 6 y 100 caracteres"),
 body("person_id")
 .notEmpty()
 .withMessage("el person_id no debe ser vacio")
 .isInt({min:1})
 .withMessage("el person_id debe ser un entero positivo") //quiere decir person id debe ser un numero entero y como minimo debe ser 1.
 .custom(async(person_id)=> {
    const person = await PersonModel.findByPk(person_id);

    if (!person) {
        throw new Error("la persona no existe");
    }
    return true;
 }),
];

export const updateUserValidation = [
    param("id")
    .isInt({min:1})
    .withMessage("el id debe ser un entero positivo")
    .custom(async(id)=> {
        const user = await UserModel.findByPk(id);

        if (!user) {
            throw new Error("el usuario no existe");
        }
        return true;
    }),

    body("name")
    .optional()
    .notEmpty()
    .withMessage("el name no debe ser vacio")
    .isLength({max:100})
    .withMessage("el name no puede superar los 100 caracteres"),
    body("email")
    .optional()
    .notEmpty()
    .withMessage("el email no debe estar vacio")
    .isEmail()
    .withMessage("debe ser en formato email")
    .custom(async (email, { req }) => {
            const user = await UserModel.findOne({
                where: { email },
            });

            if (user && user.id !== Number(req.params.id)) {
                throw new Error("el email ya esta registrado");
            }

            return true;
        }),
    body("password")
    .optional()
    .notEmpty()
    .withMessage("la password no deb estar vacia")
    .isLength({ min: 6, max: 100 })
        .withMessage("la password debe tener entre 6 y 100 caracteres"),
    body("person_id")
    .optional()
     .isInt({ min: 1 })
        .withMessage("el person_id debe ser un entero positivo")
        .custom(async (person_id) => {
            const person = await PersonModel.findByPk(person_id);

            if (!person) {
                throw new Error("la persona no existe");
            }

            return true;
        }),
];


export const idUserValidation = [
    param("id") 
    .isInt({min:1})
    .withMessage("el id debe ser un entero positivo")
    .custom(async(id) => { //consulta a la base de datos para verificar que el email no es repetido
        const user = await UserModel.findByPk(id);

        if(!user) {
            throw new Error("el usuario no existe");
        }

        return true;
    }),
];