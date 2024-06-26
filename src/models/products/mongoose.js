import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const ProductSchema = {
    _id: defaultId(32),
    title: typeString(true, 2, 64),
    category: typeString(true, 2, 64),
    description: typeString(true, 2, 5000),
    isOwnedBy: typeString(),
    brand_id: typeString(),
    prices: {
        retail: typeNumber(false, 0, 999999999999999999999)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}

const ProductMongoSchema = new Mongoose.Schema(ProductSchema)

export default Mongoose.models.products || Mongoose.model('products', ProductMongoSchema)
