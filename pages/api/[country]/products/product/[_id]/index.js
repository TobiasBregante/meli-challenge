import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import User from '@/models/user/mongoose'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import Brands from '@/src/models/brand/mongoose'
import DB from '@ConnectDb'
import withTax from '@/src/utils/product/tax'

const GetProduct = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query,
    } = req

    if (method == 'GET') {
        try {
            let finder = await Products.findById(query._id).lean()
            finder = withTax(finder, true)
            
            if (finder == null) {
                return res.status(404).json({msg:"No encontrado"})
            }
            if (query.withBrand) {
                finder.brand = await Brands.findById(finder.brand_id).lean()
                const findPhone = await User.findById(finder.isOwnedBy).lean()
                finder.brand.phone = findPhone.cellPhone
            }
            finder.comments = finder.comments.reverse()
            

            return res.json(finder)

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default GetProduct