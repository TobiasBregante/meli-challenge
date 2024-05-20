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

    if (method == 'PUT') {
        try {
            const schema = Joi.object({
                location: JoiUser().location.required(),
                isSeller: JoiUser().isSeller.required(),
                name: JoiUser().name.required(),
                lastName: JoiUser().lastName.required(),
                email: JoiUser().email.required(),
                cellPhone: JoiUser().cellPhone.required(),
                password: JoiUser().password.required()
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }

            value['status'] = {
                isBanned: false,
                isPremiun: false
            }
            const parsed = value

            //FIND EMAIL WITH CASE INSESITIVE
            if (await MongoUser.findOne({ email: new RegExp(`${parsed.email}`, 'i') }).lean()) {
                return badRequest(res,"Dirección de email ya en uso")
            }

            //ON VALIDATION SUCCESS
            return bcrypt.hash(parsed.password, 6, async (err, hash) => {
                if (err) {
                    return internalServerError(res, err)
                }
                //PASSWORD 
                parsed.password = hash

                const createUser = await new MongoUser(parsed)
                await createUser.save()

                const token = jwt.sign({
                    _id: createUser._id
                }, process.env.JWT_USER_AUTH_KEY)

                return res.status(200).json({
                    msg: "Usuario creado con exito",
                    sldtoken: token
                })
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default SignupEndpoint