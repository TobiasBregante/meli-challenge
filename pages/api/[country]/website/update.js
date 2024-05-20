import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Website from '@/src/models/website/mongoose';
import DB from '@ConnectDb'
import Joi from 'joi';

const UpdateWebsite = async (req, res) => {
    await cors(req, res)
    await DB()

    const {
        method,
        body
    } = req

    if (method == 'POST') {
        try {
            if (req.requestUser.isAdmin == false) {
                return res.status(401).json({ msg: "No estas autorizado a realizar esta acción" })
            }
            const schema = Joi.object({
                categories: Joi.array().items(Joi.object({
                    name: Joi.string().min(1).max(128).required(),
                    views: Joi.number().min(0),
                    _id: Joi.string().max(64)
                })),
                highlights: Joi.array().items(Joi.object({
                    link: Joi.string().min(0).max(2048).required(),
                    img: Joi.string().min(0).max(2048).required(),
                    _id: Joi.string().max(64)
                })),
                popup: Joi.object({
                    link: Joi.string().min(0).max(2048).required(),
                    img: Joi.string().min(0).max(2048).required()
                }),
            })

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }

            const parsed = value

            //find website 
            const finderWebsite = await Website.find({}).lean()

            if (finderWebsite.length == 1) {
                await Website.findByIdAndUpdate(finderWebsite[0]._id, {
                    ...parsed
                }).exec()
            } else {
                const newWebsite = await new Website(parsed)
                await newWebsite.save()
            }


            return res.json({ msg: "Actualizado" })



        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateWebsite)