import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Website from '@/src/models/website/mongoose';
import DB from '@ConnectDb'

const WebsiteIndex = async (req, res) => {
    await cors(req, res)
    await DB()

    const {
        method,
    } = req

    if (method == 'GET') {
        try {

            //find website 
            const finderWebsite = await Website.find({}).lean()

            return res.json(finderWebsite[0])

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default WebsiteIndex