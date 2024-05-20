import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Brands from '@/src/models/brand/mongoose'

const GetBrandByUser = async (req, res) => {
    await cors(req, res)
    const {
        method,
    } = req

    if (method == 'GET') {
        try {
            const finder = await Brands.findOne({
                isOwnedBy: req.query.user_id
            }).lean()

            if (finder == null) {
                return res.status(404).json({msg:"No encontrado"})
            }

            return res.json(finder)

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default GetBrandByUser