import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Brands from '@/src/models/brand/mongoose'
import Products from '@/src/models/products/mongoose'

const GetBrand = async (req, res) => {
    await cors(req, res)
    const {
        method,
        query:{
            withProducts,
            _id,
            byPass
        }
    } = req

    if (method == 'GET') {
        try {
            const finder = await Brands.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({msg:"No encontrado"})
            }
            if (!finder.isActive && byPass == undefined) {
                return res.status(404).json({msg:"Pausado"})
            }

            if (withProducts) {
                finder.products = await Products.find({brand_id:_id}).lean()
            }

            return res.json(finder)

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default GetBrand