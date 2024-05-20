import Joi from "joi"
import { stringMessages, numberMessages, booleanMessages } from '@/utils/joi/customMessages'

const ProductJoiSchema = () => {
    return {
        title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de producto")),
        category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
        description: Joi.string().min(4).max(5000).messages(stringMessages("Descripción")),
        prices: Joi.object({
            retail: Joi.number().min(0).max(999999999999999999999).messages(numberMessages("Por menor"))
        }),
        imgs: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Imagenes"))),
    }
}

export default ProductJoiSchema