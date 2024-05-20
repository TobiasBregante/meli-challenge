import Mongoose from "mongoose";
import { defaultId, typeString } from '@/utils/schemasTypes'

const ChatSchema = {
    _id: defaultId(32),
    user: typeString(true,3,128),
    brand: typeString(true,3,128),
    messages:[{
        message: typeString(true,1,8192),
        isFromBrand: Boolean,
        date:{
            type:Date,
            default: Date.now
        }
    }]
}

const ChatMongoSchema = new Mongoose.Schema(ChatSchema)

export default Mongoose.models.chats || Mongoose.model('chats', ChatMongoSchema)

export {
    ChatSchema
}