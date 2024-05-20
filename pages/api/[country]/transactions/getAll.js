import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Transactions from '@/src/models/transactions/mongoose'
import DB from '@ConnectDb'


const GetTransactions = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            text, limit
        }
    } = req

    if (method === 'GET') {
        try {
            let dbQuery = {
            }

            if (text) {
                dbQuery.payer.phone.number = new RegExp(`${text}`, 'i')
            }            

            let sorting = {}

            let hardLimit = 10
            
            if (limit) {
                hardLimit = limit
            }

            let finder = await Transactions.find(dbQuery)
                .sort(sorting)
                .limit(hardLimit)
                .lean()

            if (finder.length == 0) {
                return res.status(404).json({ msg: "Sin resultados" })
            }

            return res?.json(finder)
        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default GetTransactions