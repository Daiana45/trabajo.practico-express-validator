import { validationResult } from "express-validator"

//son las mismas lineas que las del controlador.
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array()); //para que no nos envie el de errors ponemos .array(), o mapped o tambien
        //abajo del if
        //const custom = errors.formatWith((err) => {
            // return `${err.msg}`};);
           // return res.status(400).json(custom.array());
    }
    next();
};