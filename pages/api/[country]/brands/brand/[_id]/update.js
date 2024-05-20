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
                imgs: JoiBrand().imgs,
                category: JoiBrand().category,
                payMethod: JoiBrand().payMethod,
                location: JoiBrand().location,
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

            if (parsed.isActiveUntil && parsed.isActiveUntil != "now") {
                parsed.isActive = true
                await User.findByIdAndUpdate(finder.isOwnedBy,{
                    $push:{
                        notifications: {
                            title: "Tu marca a sido validada",
                            description: "Hemos validado tu marca, ahora tus productos seran visibles, pero recuerda debes pasarte a premiun si no quieres que tus productos caduquen en 3 meses"
                        }
                    }
                }).exec()
            }

            if (parsed.isActiveUntil == "now") {
                parsed.isActive = false
                parsed.isActiveUntil = new Date()
                
                await User.findByIdAndUpdate(finder.isOwnedBy,{
                    $push:{
                        notifications: {
                            title: "Tu marca a sido desactivada",
                            description: "Hemos desactivado tu marca contacta con soporte para saber porque."
                        }
                    }
                }).exec()

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