import { PersonModel } from "../models/person.model.js";

export const createPerson = async (req, res) => {
    try {
        const { name, Lastname } = req.body;

        if (
            typeof name !== "string" ||
            name.trim() === "" ||
            name.length > 100
        ) {
            return res.status(400).json({
                message: "el nombre debe ser texto no vacio de hasta 100 caracteres",
            });
        }

        if (
            typeof Lastname !== "string" ||
            Lastname.trim() === "" ||
            Lastname.length > 100
        ) {
            return res.status(400).json({
                message: "el apellido debe ser texto no vacio de hasta 100 caracteres",
            });
        }

        const existingPerson = await PersonModel.findOne({
            where: {name, Lastname },
        });

        if (existingPerson) {
            return res.status(400).json({
                message: "el apellido ya esta registrado",
            });
        }

        const newPerson = await PersonModel.create({
            name,
            Lastname,
        });

        return res.status(201).json({
            message: "persona creada correctamente",
            person: newPerson,
        });

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};

export const getPersons = async (req, res) => {
    try {
        const persons = await PersonModel.findAll();

        return res.status(200).json(persons);

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};