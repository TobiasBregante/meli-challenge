import Mongoose from "mongoose";
import { defaultId } from '@/utils/schemasTypes'

const TransactionSchema = {
    _id: defaultId(),
    transaction: Object,
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const TransactionMongoSchema = new Mongoose.Schema(TransactionSchema)

export default Mongoose.models.transactions || Mongoose.model('transactions', TransactionMongoSchema)

export {
    TransactionSchema
}