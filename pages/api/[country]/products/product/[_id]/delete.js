import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import userAuth from '@/src/middlewares/userAuth';
import DB from '@ConnectDb'

const UpdateProduct = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
             _id
        },
    } = req

    if (method == 'GET') {
        try {
            const finder = await Products.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({ msg: "No encontrado" })
            }

            if (finder.isOwnedBy != req.requestUser._id && req.requestUser.isAdmin == false) {
                return badRequest(res, "No puedes editar una marca que no es tuya")
            }

            await Products.findByIdAndRemove(_id)

            return res.json({msg:"Producto Eliminado"})

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)