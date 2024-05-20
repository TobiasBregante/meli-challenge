import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import User from '@/src/models/user/mongoose'
import DB from '@ConnectDb'

const ManageUserAdmin = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            _id, state
        }
    } = req

    if (method == 'GET') {
        try {
            if (req.requestUser.isAdmin == false) {
                return res.status(401).json({ msg: "No estas autorizado a hacer esta acción" })
            }

            if (state == undefined) {
                return res.status(400).json({ msg: "Falta el estado que tendra" })
            }

            await User.findOneAndUpdate({ _id: _id }, {
                isAdmin: state == "true"
            }).exec()

            return res.json({ msg: "Actualizado" })



        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(ManageUserAdmin)