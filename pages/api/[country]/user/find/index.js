import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import User from '@/src/models/user/mongoose'
import DB from '@ConnectDb'


const FindUser = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        headers,
        query: {
            name, email, phone, limit, country
        }
    } = req

    if (method == 'GET') {
        try {
            let dbQuery = {
                
            }
            
            if (name) {
                dbQuery.name = new RegExp(`${name}`, 'i')
            }
            if (email) {
                dbQuery.email = new RegExp(`${email}`, 'i')
            }
            if (phone) {
                dbQuery.cellPhone = new RegExp(`${phone}`, 'i')
            }

            let hardLimit = 8
            if (limit) {
                hardLimit = limit
            }

            dbQuery = {
                ...dbQuery,
            }

            let finder = await User.find(dbQuery, {
                password: 0
            })
                .limit(hardLimit)
                .lean()

            if (finder.length == 0) {
                return res.status(404).json({ msg: "Sin resultados" })
            }
            return res.json(finder)

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default FindUser