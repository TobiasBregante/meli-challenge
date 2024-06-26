import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import userAuth from '@/src/middlewares/userAuth';
import JoiProduct from '@/models/products/joi'
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
                title: JoiProduct().title,
                category: JoiProduct().category,
                description: JoiProduct().description,
                prices:JoiProduct().prices,
            })

            const { error, value } = schema.validate(body);
            const parsed = value

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }

            if (finder.isOwnedBy != req.requestUser._id && req.requestUser.isAdmin == false) {
                return badRequest(res, "No puedes editar una marca que no es tuya")
            }

            await Products.findByIdAndUpdate(_id, parsed).exec()

            return res.json({msg:"Actualizado"})

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)