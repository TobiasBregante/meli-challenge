import Joi from "joi"
import { stringMessages, booleanMessages } from '@/utils/joi/customMessages'

const UserJoiSchema = () => {
    return {
        //NOTE, .Required() is not added due to not all are required in login form validation
        brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
        category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
        payMethod: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))),
        phoneNumbers: Joi.array().items(Joi.string().min(4).max(14).messages(stringMessages("Numero de telefono"))),
        imgs: Joi.object({
            principal: Joi.string().min(1).max(128),
            background: Joi.string().min(1).max(128),
        }),
        location: Joi.object({
            zone: Joi.string().valid("online").messages(stringMessages("Zona")),
        }),
    }
}

export default UserJoiSchema