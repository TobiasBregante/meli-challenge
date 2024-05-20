import Joi from 'joi';
import MongoProduct from '@/models/products/mongoose';
import MongoBrand from '@/models/brand/mongoose'
import JoiProduct from '@/models/products/joi'
import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import userAuth from '@/src/middlewares/userAuth';

const AddProductEndpoint = async (req, res) => {
    await DB()

    const {
        method,
        body,
    } = req

    if (method == 'PUT') {
        try {
            const schema = Joi.object({
                title: JoiProduct().title.required(),
                category: JoiProduct().category.required(),
                description: JoiProduct().description.required(),
                prices: JoiProduct().prices.required(),
                imgs: JoiProduct().imgs.required()
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }
            const finder = await MongoBrand.findOne({
                isOwnedBy: req.requestUser._id
            }).lean()

            if (finder == null) {
                return badRequest(res, "No tienes una marca")
            }

            value['status'] = {
                isPremiun: true,
                isPublic: true
            }
            const parsed = value

            parsed.isOwnedBy = req.requestUser._id
            parsed.brand_id = finder._id
            parsed.stats = {
                whatsappClicks: 0
            }
            parsed.status = {
                isPremiun: true,
                isPublic: true
            }

            const now = new Date();

            if (finder.isActive) {
                parsed.status.isPublic = true
                parsed.status.publicUntil = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())
            }

            if (req.requestUser.status.isPremiun) {
                parsed.status.isPremiun = true
                parsed.status.isPublic = true
                parsed.status.publicUntil = req.requestUser.status.isPremiunUntil
            }

            const createProduct = await new MongoProduct(parsed)
            await createProduct.save()


            return res.status(200).json({
                msg: "Producto creado con exito, aguarde a que aprobemos su publicación",
            })

        } catch (err) {
            console.log(err)
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(AddProductEndpoint, true)