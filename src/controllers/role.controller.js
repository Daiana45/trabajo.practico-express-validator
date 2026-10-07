import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (
            typeof name !== "string" ||
            name.trim() === "" ||
            name.length > 50
        ) {
            return res.status(400).json({
                message: "el nombre del rol debe ser texto no vacio de hasta 50 caracteres",
            });
        }

        const existingRole = await RoleModel.findOne({
            where: { name },
        });

        if (existingRole) {
            return res.status(400).json({
                message: "el rol ya existe",
            });
        }

        const newRole = await RoleModel.create({
            name,
        });

        return res.status(201).json({
            message: "rol creado correctamente",
            role: newRole,
        });

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await RoleModel.findAll({
            attributes: ["id", "name"],
            include: [
                {
                    model: UserModel,
                    as: "users",
                    attributes: ["id", "name", "email"],
                },
            ],
        });

        return res.status(200).json(roles);

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};