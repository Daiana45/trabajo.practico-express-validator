import { PersonModel } from "../models/person.model.js";
import {Task} from "../models/task.model.js"
import { UserModel } from "../models/user.model.js";

export const createTask = async(req, res) => {
    try{
        const {title, description, isComplete, user_id} = req.body; //agregamos user_id porque el cliente tiene que decirnos que usuario creo la tarea

        const user = await UserModel.findByPk(user_id); //busca el usuario con ese id, hace una consulta.

        //comprobamos si existe
        if(!user) {
            return res.status(404).json({message: "el usuario no existe"});
        }
       
    const newTask = await Task.create({title, description, isComplete, user_id});
    return res.status(201).json({message:"la tarea se creo correctamente", Task: newTask,}); //201 cuando creamos correctamente
    } catch(error) {
        return res.status(500).json({message:"hubo un problema en el servido", error: error.message,});
    }
};

export const getTask = async(req, res) => {
    try{
        const task = await Task.findAll({ //busca todas las tareas
            include:[ //ademas de las tareas quiero informacion relacionada
                {
                    model: UserModel, //tiene que ser el modelo
                    as: "author", //debe ser el id,
                    attributes: {
                        exclude: ["password", "person_id"], //para excluir
                    },
                   // include:[ //otro include para traer otras relaciones
                       // {
                           // model:PersonModel,
                            //as:"owner",
                        //},
                   // ]
                },
            ]
           //attributes:["title", "description"] 
          // exclude: ["description"] o de esta manera
        }); //al findall hay que decirle que tambien traiga las relaciones.
        return res.status(201).json(task);
    } catch(error){
        return res.status(500).json({message:"error del servidor", error: error.message});
    }
};

export const getTasksById = async(req, res) => {
    try{
        const {id} = req.params; //nos trae un id
        const task = await Task.findByPk(id, { //busca una tarea por su clave primaria

        //solo para una sola tarea.
        include:[
            {
                modelo: UserModel,
                as: "author",
                attributes:{
                    exclude:["password", "person_id"],
                },
            },
        ]
    });
        if (!task) {
            return res.status(404).json({message:"tarea no encontrada"});
        } 
        return res.status(201).json(task);
    } catch(error){
        return res.status(500).json({message:"error al obtener la tarea", error: error.message});
    }
};

export const deleteTask = async (req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task) {
            return res.status(404).json({message:"tarea no encontrada"});
        }
        await task.destroy();
        return res.status(200).json({message: "tarea eliminado con exito"});
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description, isComplete} = req.body;
        const task = await Task.findByPk(id);
        if(!task) {
            return res.status(404).json({message: "tarea no encontrada"});
        }
        if (typeof title !== "string" || title.trim() === "" || title.length > 100) {
      return res.status(400).json({
        message: "el titulo no debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message: "la descripcion debe ser texto no vacio hasta 100 caracteres",
      });
    }
    if (
      typeof isComplete !== "boolean"
    ) {
      return res.status(400).json({
        message:
          "el estado de la tarea debe ser completo o incompleto",
      });
    }
    await task.update({title, description, isComplete });
        return res.status(200).json({
            message:"tarea actualizada",
            task,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error al actualizar la tarea",
            error: error.message,
        });
    }
};