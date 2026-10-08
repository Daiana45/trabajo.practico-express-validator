import { validationResult } from "express-validator"

//son las mismas lineas que las del controlador.
export const validate = (req, res, next) => { //busca en req los errores wue fueron creador por body, param, isemail y custom
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //pregunta si hay errores, true no hay errores y false hay al menos uno
        return res.status(400).json(errors.array()); //para que no nos envie el de errors ponemos .array(), o mapped o tambien
        //abajo del if
        //const custom = errors.formatWith((err) => { fomatwith sirve para csmbiar los fomaros de loa erores antes de enviarlos.
            // return `${err.msg}`};);
           // return res.status(400).json(custom.array());
    }
    next();
};