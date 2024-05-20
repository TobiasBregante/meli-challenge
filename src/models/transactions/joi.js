import Joi from "joi"
import { stringMessages } from '@/utils/joi/customMessages'

const TransactionJoiSchema = () => {
    return {
        transaction: Joi.object().messages(stringMessages("Transacción"))
    }
}

export default TransactionJoiSchema