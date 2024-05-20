import Joi from "joi"
import {  stringMessages, booleanMessages } from '@/utils/joi/customMessages'

const UserJoiSchema = () => {
    return {
        //NOTE, .Required() is not added due to not all are required in login form validation
        location: Joi.object(),
        isSeller: Joi.boolean().messages(booleanMessages("es vendedor")),
        name:
            Joi
                .string()
                .min(3).max(32)
                .messages(stringMessages("nombre")),
        lastName:
            Joi
                .string()
                .min(3).max(32)
                .messages(stringMessages("apellido")),
        email:
            Joi
                .string()
                .min(6).max(320)
                .email().required()
                .messages(stringMessages("email")),
        cellPhone:
            Joi
                .string()
                .min(8).max(14)
                .messages(stringMessages("celular")),
        password:
            Joi
                .string()
                .min(6).max(2048)
                .messages(stringMessages("contraseña")),
    }
}

export default UserJoiSchema