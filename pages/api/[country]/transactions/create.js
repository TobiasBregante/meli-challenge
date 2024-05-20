import Joi from 'joi';
import MongoTransaction from '@/models/transactions/mongoose';
import JoiTransaction from '@/models/transactions/joi'
import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import userAuth from '@/src/middlewares/userAuth';

const AddTransactionEndpoint = async (req, res) => {
    await DB()

    const {
        method,
        body,
    } = req

    if (method == 'POST') {
        try {
            const schema = Joi.object({
                transaction: JoiTransaction().transaction.required()
            });

            const { error, value } = schema.validate(body);

            if (error) {
                //ON JOI VALIDATION ERROR
                return badRequest(res, error.details[0].message)
            }

            const parsed = value

            const createTransaction = await new MongoTransaction(parsed)
            await createTransaction.save()

            return res.status(200).json({
                msg: "Transacción creada con exito",
            })

        } catch (err) {
            console.log(err)
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}

export default userAuth(AddTransactionEndpoint, false)