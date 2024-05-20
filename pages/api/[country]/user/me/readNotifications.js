import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import User from '@/models/user/mongoose'

const ReadNotifications = async (req, res) => {
    await cors(req, res)
    const {
        method,
    } = req

    if (method == 'GET') {
        try {
            const notifications = req.requestUser.notifications.map(notification=>({
                ...notification,
                isReaded: true
            }))

            await User.findByIdAndUpdate(req.requestUser._id, {
                notifications: notifications
            }).exec()

            return res.json("Leidas")



        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(ReadNotifications)