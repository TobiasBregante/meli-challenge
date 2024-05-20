import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import userAuth from '@/src/middlewares/userAuth';
import DB from '@ConnectDb'
import Joi from 'joi';

const UpdateProduct = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            _id
        },
        body
    } = req

    if (method == 'POST') {
        try {
            const finder = await Products.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({ msg: "No encontrado" })
            }
            const schema = Joi.object({
                review: Joi.string().min(0).max(2048),
                rating: Joi.number().min(1).max(5).required()
            })
            const { error, value } = schema.validate(body)

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }
            const parsed = value

            await Products.findByIdAndUpdate(finder._id, {
                $push: {
                    reviews: {
                        user: {
                            _id: req.requestUser._id,
                            img: req.requestUser.img,
                            name: req.requestUser.name,
                        },
                        ...parsed
                    }
                }
            }).exec()

            return res.json({ msg: "Muchas gracias por tu opinion!" })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)