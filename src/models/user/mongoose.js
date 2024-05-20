import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const UserSchema = {
    _id: defaultId(),
    isAdmin: {
        type: Boolean,
        default: false
    },
    location: Object,
    isSeller: {
        type: Boolean,
        default: true
    },
    name: typeString(true, 3, 32),
    lastName: typeString(true, 3, 32),
    email: typeString(true, 6, 320),
    cellPhone: typeString(false, 8, 14),
    cellPhone2: typeString(false,8 , 14),
    password: typeString(true, 6, 2048),
    img: typeString(false,2,256),
    notifications:[{
        title: typeString(),
        description: typeString(false),
        link: typeString(false,0,2048),
        date: {
            type: Date,
            default: Date.now
        },
        isReaded:{
            type: Boolean,
            default: false
        }
    }],
    status:{
        isBanned: {
            type: Boolean,
            default: false
        },
        isPremiun:{
            type: Boolean,
            default: true
        },
        isPremiunUntil:{
            type: Date
        },
        premiunPlan: typeString(false)
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const UserMongoSchema = new Mongoose.Schema(UserSchema)

export default Mongoose.models.users || Mongoose.model('users', UserMongoSchema)

export {
    UserSchema
}