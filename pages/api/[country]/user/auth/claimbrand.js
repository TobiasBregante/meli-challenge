import Joi from 'joi';
import MongoBrand from '@/models/brand/mongoose';
import JoiBrand from '@/models/brand/joi'
import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';

const ClaimBrandEndpoint = async (req, res) => {
    await cors(req, res)
    await DB()

    const {
        method,
        body,
        query:{asUser_id}
    } = req

    if (method == 'PUT') {
        try {
            const schema = Joi.object({
                brandName: JoiBrand().brandName.required(),
                imgs: JoiBrand().imgs.required(),
                category: JoiBrand().category.required(),
                payMethod: JoiBrand().payMethod.required(),
                location: JoiBrand().location.required(),
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }
            const finder = await MongoBrand.findOne({
                isOwnedBy: req.query.user_id
            }).lean()

            if(finder != null){
                return badRequest(res,"Ya tienes una marca registrada")
            }

            const parsed = value
            parsed.isOwnedBy = req.requestUser._id

            if (asUser_id && req.requestUser.isAdmin) {
                parsed.isOwnedBy = asUser_id
            }

            const createBrand = await new MongoBrand(parsed)
            await createBrand.save()


            return res.status(200).json({
                msg: "Marca creada con exito, aguarde a que validemos sus datos",
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(ClaimBrandEndpoint,true)