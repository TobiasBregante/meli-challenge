import Joi from "joi"
import { stringMessages, booleanMessages } from '@/utils/joi/customMessages'

const ChatJoiSchema = () => {
    return {
        //NOTE, .Required() is not added due to not all are required in login form validation
        user: Joi.string().min(3).max(128).messages(stringMessages("Id del usuario")),
        brand: Joi.string().min(3).max(128).messages(stringMessages("Id de la marca")),
        message: Joi.string().min(1).max(8192).messages(stringMessages("Mensaje"))
    }
}

export default ChatJoiSchema