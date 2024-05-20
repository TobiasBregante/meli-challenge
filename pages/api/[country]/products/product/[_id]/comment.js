import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import User from '@/src/models/user/mongoose'
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
                comment: Joi.string().min(1).max(1024),
                response: Joi.string().min(1).max(1024),
                comment_id: Joi.string().min(1).max(1024),
                removeBy_id: Joi.string().min(1).max(1024)
            })
            const { error, value } = schema.validate(body)

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }
            const parsed = value

            if (parsed.comment) {
                await Products.findByIdAndUpdate(finder._id, {
                    comments: [...finder.comments, {
                        user: {
                            _id: req.requestUser._id,
                            img: req.requestUser.img,
                            name: req.requestUser.name,
                        },
                        comment: parsed.comment
                    }]
                }).exec()

                await User.findOneAndUpdate({ _id: finder.isOwnedBy }, {
                    $push:{
                        notifications: {
                            title: `${req.requestUser.name} te pregunto en ${finder.title}`,
                            description: parsed.comment,
                            link: `${process.env.FRONTEND_HOST}/product/${finder._id}#comments`
                        }
                    }
                }).exec()
            }
            if (parsed.response && parsed.comment_id) {
                if (finder.isOwnedBy != req.requestUser._id) {
                    return badRequest(res, "No estas autorizado a responder")
                }
                await Products.findByIdAndUpdate(finder._id, {
                    comments: finder.comments.map(c=>{
                        if (c._id == parsed.comment_id) {
                            c.response = parsed.response
                        }
                        return c
                    })
                }).exec()
            }
            if (parsed.removeBy_id) {
                if (finder.isOwnedBy != req.requestUser._id) {
                    return badRequest(res, "No estas autorizado a eliminar")
                }
                if (!req.requestUser.status.isPremiun) {
                    return badRequest(res, "Pasate a premiun para poder hacer esto")
                }
                await Products.findByIdAndUpdate(finder._id, {
                    comments: finder.comments.filter(c=>c._id != parsed.removeBy_id)
                }).exec()
            }

            return res.json({ msg: "Listo!" })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)