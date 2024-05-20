import Joi from 'joi';
import jwt from 'jsonwebtoken';
import MongoUser from '@/models/user/mongoose';
import JoiUser from '@/models/user/joi'
import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import bcrypt from 'bcryptjs'
import cors from '@Cors'



const SignupEndpoint = async (req, res) => {
    await cors(req, res)
    await DB()

    const {
        method,
        body,
    } = req

    if (method == 'POST') {
        try {
            const schema = Joi.object({
                email: JoiUser().email.required(),
                password: JoiUser().password.required()
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }

            const parsed = value

            let userData = await MongoUser
                .findOne({
                    email: new RegExp(`${parsed.email}`, 'i')
                }).lean()

            if (!userData) {
                return badRequest(res, "Usuario no encontrado")
            }

            //ON VALIDATION SUCCESS
            if (await bcrypt.compare(parsed.password, userData.password) == false) {
                return badRequest(res, "Email o contraseña invalidos")
            }

            const token = jwt.sign({
                _id: userData._id
            }, process.env.JWT_USER_AUTH_KEY)

            return res.json({
                msg: "Sesión iniciada",
                sldtoken: token
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default SignupEndpoint