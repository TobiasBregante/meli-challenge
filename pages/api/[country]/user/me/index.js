import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Brand from '@/src/models/brand/mongoose';
import Products from '@/src/models/products/mongoose'
import User from '@/models/user/mongoose'

const GetMyUserData = async (req, res) => {
    await cors(req, res)
    const {
        method,
    } = req

    if (method == 'GET') {
        try {

            const myProducts = await Products.find({ isOwnedBy: req.requestUser._id }).count()
            req.requestUser.products = myProducts

            const response = {}

            if (req.query.withBrand != undefined) {
                const finder = await Brand.findOne({
                    isOwnedBy: req.requestUser._id,
                }).lean()

                if (finder != null) {
                    req.requestUser.brand = finder
                }
            }

            return res.json(req.requestUser)
        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(GetMyUserData)