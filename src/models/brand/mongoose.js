import Mongoose from "mongoose";
import { defaultId, typeNumber, typeString } from '@/utils/schemasTypes'

const BrandSchema = {
    _id: defaultId(),

    isPremiun: {
        type: Boolean,
        default: true
    },
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
    isWholesaleAndRetail: Boolean,
    category: typeString(true, 1, 128),
    shippingBy: typeString(false, 1, 128),
    payMethod: [typeString(true, 1, 128)],
    phoneNumbers: [typeString(true, 8, 14)],
    imgs: {
        principal: typeString(false),
        background: typeString(false)
    },
    stats: {
        stars: [typeNumber(true, 1, 5)],
        views: typeNumber(false, 0, 9999999)
    },
    location: {
        zone: typeString(true, 1, 128),//Index for an array of ["salada","flores","online",...]
        //this is in case of: la salada
        shed: typeString(false, 0, 32),
        stallNumber: typeString(false, 0, 32),
        hallway: typeString(false, 0, 32),
        row: typeString(false, 0, 32),
        floor: typeString(false, 0, 32),
        side: typeString(false, 0, 32),
        galleryName: typeString(false, 0, 64),
        isInGallery: Boolean,
        //this is in case of: flores
        positionInGallery: typeString(false, 0, 32),
        street: typeString(false, 0, 32),
        streetNumber: typeString(false, 0, 32),
    },
    stands: [{
            shed: typeString(false, 0, 32), 
            stallNumber: typeString(false, 0, 32),
            hallway: typeString(false, 0, 32),
            row: typeString(false, 0, 32),
            floor: typeString(false, 0, 32),
            side: typeString(false, 0, 32),
            galleryName: typeString(false, 0, 64),
            isInGallery: Boolean,
            _id: {type: false}
        }],
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const BrandMongoSchema = new Mongoose.Schema(BrandSchema)

const Brand= Mongoose.models.brand || Mongoose.model('brand', BrandMongoSchema)


try{

    Brand.find({}, function(err, brands) {
    if (err) {
        console.log(err);
    } else {
        brands.forEach(function(brand) {
            if(brand.stands === undefined){
                brand.stands = []
                brand.save();
            }
        });
    }
});
} catch(e){
    console.log(e)
}


export default Brand

export {
    BrandSchema
}