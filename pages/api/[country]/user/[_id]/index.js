import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Brand from '@/src/models/brand/mongoose';
import User from '@/src/models/user/mongoose'
import DB from '@ConnectDb'

const GetUserData = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
    } = req

    if (method == 'GET') {
        try {
            const findUser = await User.findById(req.query._id,{password:0}).lean()
            if (findUser == null) {
                return res.status(404).json({msg:"Usuario no encontrado"})
            }
            const findBrand = await Brand.findOne({isOwnedBy: findUser._id}).lean()

            if (findBrand != null) {
                findUser.brand = findBrand
            }
            return res.json(findUser)

            

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(GetUserData, false)