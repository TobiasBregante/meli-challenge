import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const ProductSchema = {
    _id: defaultId(32),
    title: typeString(true, 2, 64),
    category: typeString(true, 2, 64),
    description: typeString(true, 2, 5000),
    isOwnedBy: typeString(),
    brand_id: typeString(),

    status:{
        isPublic: {
            type: Boolean,
            default: false
        },
        publicUntil: {
            type: Date,
        },
        isPremiun: Boolean,
    },

    stats:{
        whatsappClicks: typeNumber(false,0, 999999999999999999999),
        views: {
            type: Number,
            default: 0
        }
    },

    comments: [{
        _id: defaultId(32),
        user:{
            _id: typeString(),
            img: typeString(),
            name: typeString(true,3,64)
        },
        comment: typeString(true,2,1024),
        response: typeString(false,2,1024),
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    reviews:[{
        user:{
            _id: typeString(),
            img: typeString(),
            name: typeString(true,3,64)
        },
        review: typeString(false,0,2048),
        rating: typeNumber(true,1,5)
    }],


    isWholesaleAndRetail: Boolean,
    prices: {
        retail: typeNumber(false, 0, 999999999999999999999)
    },
    imgs: [typeString(true,1,128)],
    createdAt: {
        type: Date,
        default: Date.now
    }
}

const ProductMongoSchema = new Mongoose.Schema(ProductSchema)

export default Mongoose.models.products || Mongoose.model('products', ProductMongoSchema)
