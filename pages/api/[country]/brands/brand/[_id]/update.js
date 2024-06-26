import Joi from 'joi';
import MongoBrand from '@/models/brand/mongoose';
import User from '@/models/user/mongoose'
import JoiBrand from '@/models/brand/joi'
import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';

const ManageBrand = async (req, res) => {
    await cors(req, res)
    await DB()

    const {
        method,
        body,
        query: { _id }
    } = req

    if (method == 'POST') {
        try {
            const schema = Joi.object({
                brandName: JoiBrand().brandName,
                category: JoiBrand().category,
                payMethod: JoiBrand().payMethod,
                isActiveUntil: Joi.string(),
                phoneNumbers: JoiBrand().phoneNumbers
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }
            const parsed = value

            const finder = await MongoBrand.findById(_id).lean()

            if (finder == null) {
                return badRequest(res, "Marca no encontrada")
            }
            if (finder.isOwnedBy != req.requestUser._id && req.requestUser.isAdmin == false) {
                return badRequest(res, "No puedes editar una marca que no es tuya")
            }

            if (parsed.isActiveUntil && !req.requestUser.isAdmin) {
                return badRequest(res, "No puedes editar esto porque no eres un administrador")
            }

            const updateBrand = await MongoBrand.findByIdAndUpdate(_id, parsed).exec()

            return res.status(200).json({
                msg: "Marca actualizada",
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(ManageBrand, true)