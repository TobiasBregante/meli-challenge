import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const WebsiteSchema = {
    _id: defaultId(),
    categories: [{
        name: typeString(true, 1, 128),
        img: typeString(),
        views: {
            type:Number,
            default: 0
        }
    }],
    highlights: [{
        link: typeString(true, 0,2048),
        img:typeString(true, 1,2048),
    }],
    popup: {
        link: typeString(true, 0,2048),
        img: typeString(true, 1,2048)
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const WebsiteMongoSchema = new Mongoose.Schema(WebsiteSchema)

export default Mongoose.models.websites || Mongoose.model('websites', WebsiteMongoSchema)

export {
    WebsiteSchema
}