import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Chat from '@/src/models/chat/mongoose';
import ChatJoiSchema from '@/src/models/chat/joi';
import Joi from 'joi';
import Brands from '@/src/models/brand/mongoose'

const GetMyUserData = async (req, res) => {
    await cors(req, res)
    const {
        method,
        body
    } = req

    if (method == 'POST') {
        try {
            const schema = Joi.object({
                user: ChatJoiSchema().user,
                brand: ChatJoiSchema().brand.required(),
                message: ChatJoiSchema().message.required()
            })

            const { error, value } = schema.validate(body)

            if (error) {
                return res.status(400).json({
                    msg: error.message
                })
            }
            const parsed = value
            //When msg is send by brand change user to the brand
            if (parsed.user == undefined) {
                parsed.user = req.requestUser._id
            } else {
                const checkBrandOwnership = await Brands.findOne({
                    brand: parsed.brand,
                    isOwnedBy: req.requestUser._id
                }).lean()

                if (checkBrandOwnership == null) {
                    return res.status(401).json({ msg: "No eres dueño de esta marca para responder" })
                }
            }



            const chatFinder = await Chat.findOne({ brand: body.brand, user: parsed.user }).lean()


            if (chatFinder == null) {
                if (body.user != undefined) {
                    return res.status(401).json({ msg: "No puedes iniciar un chat con un usuario"})
                }
                const createChat = await new Chat({
                    user: parsed.user,
                    brand: parsed.brand,
                    messages: [{
                        message: parsed.message,
                        isFromBrand: body.user !== undefined
                    }]
                })
                await createChat.save()
                return res.json({ msg: "Enviado" })
            } else {
                await Chat.findByIdAndUpdate(chatFinder._id, {
                    messages: [
                        ...chatFinder.messages,
                        {
                            message: parsed.message,
                            isFromBrand: body.user !== undefined
                        }
                    ]
                }).exec()
                return res.json({ msg: "Enviado" })
            }

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(GetMyUserData, true)