import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import User from '@/src/models/user/mongoose'
import userAuth from '@/src/middlewares/userAuth';
import JoiUser from '@/src/models/user/joi';
import DB from '@ConnectDb'
import Joi from 'joi';

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

    if (method == 'PUT') {
        try {
            const schema = Joi.object({
                isSeller: JoiUser().isSeller,
                name: JoiUser().name,
                lastName: JoiUser().lastName,
                email: JoiUser().email,
                cellPhone: JoiUser().cellPhone
            });

            const { error, value } = schema.validate(body);
            const parsed = value

            if (error) {
                //ON JOI VALIDATION ERROR
                console.log(error)
                return badRequest(res, error.details[0].message)
            }

            const finder = await User.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({ msg: "No encontrado" })
            }
            

            if (finder._id != req.requestUser._id && req.requestUser.isAdmin == false) {
                return badRequest(res, "No puedes editar un perfil que no es tuyo")
            }

            await User.findByIdAndUpdate(_id, parsed).exec()

            return res.json({ msg: "Actualizado" })

        } catch (err) {
            console.log(res, err)
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(UpdateProduct, true)