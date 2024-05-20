import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Chat from '@/src/models/chat/mongoose';
import Brands from '@/src/models/brand/mongoose'
import Users from '@/src/models/user/mongoose'

const GetMyUserData = async (req, res) => {
    await cors(req, res)
    const {
        method,
        body
    } = req

    if (method == 'GET') {
        try {
            let finder = await Chat.find({ user: req.requestUser._id }).lean()

            const brandsByUser = await Brands.findOne({
                isOwnedBy: req.requestUser._id
            }).lean()

            if (brandsByUser != null) {
                const brandChatsFinder = await Chat.find({
                    brand: brandsByUser._id
                }).lean()

                finder = [...finder,...brandChatsFinder]
            }

            if (finder.length == 0) {
                return res.status(404).json({ msg: "Sin chats aun" })
            }
            const brandFill = finder.map(async chat => ({
                ...chat,
                user: await Users.findById(chat.user, { password: 0, status: 0, createdOn: 0, email: 0 }),
                brand: await Brands.findById(chat.brand)
            }))
            return Promise.all(brandFill).then(chatsWithBrands => {
                return res.json(chatsWithBrands)
            })


        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(GetMyUserData, true)