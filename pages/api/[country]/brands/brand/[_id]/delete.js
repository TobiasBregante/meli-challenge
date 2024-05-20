import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import Brands from '@/src/models/brand/mongoose'
import User from '@/src/models/user/mongoose'
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
        body
    } = req

    if (method == 'GET') {
        try {
            const finder = await Brands.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({ msg: "No encontrado" })
            }

            if (finder.isOwnedBy != req.requestUser._id && req.requestUser.isAdmin == false) {
                return badRequest(res, "No puedes editar una marca que no es tuya")
            }
            await User.findByIdAndUpdate(finder.isOwnedBy,{
                $push:{
                    notifications: {
                        title: "Tu marca a sido eliminado",
                        description: "Hemos tomado la decisión de eliminar tu marca, porque viola nuestras politicas de uso."
                    }
                }
            })
            await Products.deleteMany({
                isOwnedBy: finder.isOwnedBy
            })
            await Brands.findByIdAndRemove(_id)

            return res.json({ msg: "Eliminada" })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)