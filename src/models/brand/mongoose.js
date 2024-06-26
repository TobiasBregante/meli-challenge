import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const BrandSchema = {
    _id: defaultId(),
    isActive: {
        type: Boolean,
        default: true
    },
    isActiveUntil: {
        type: Date,
        default: Date.now
    },
    isOwnedBy: typeString(),
    brandName: typeString(true, 3, 32),
    category: typeString(true, 1, 128),
    shippingBy: typeString(false, 1, 128),
    payMethod: [typeString(true, 1, 128)],
    phoneNumbers: [typeString(true, 8, 14)],
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const BrandMongoSchema = new Mongoose.Schema(BrandSchema)

const Brand= Mongoose.models.brand || Mongoose.model('brand', BrandMongoSchema)

export default Brand

export {
    BrandSchema
}