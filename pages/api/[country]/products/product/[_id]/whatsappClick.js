import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import DB from '@ConnectDb'

const WhatsappClick = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
         _id, 
        },
    } = req

    if (method == 'GET') {
        try {
            const finder = await Products.findById(_id).lean()

            if (finder == null) {
                return res.status(404).json({ msg: "No encontrado" })
            }

            await Products.findByIdAndUpdate(_id, {
                "stats.whatsappClicks": finder.stats.whatsappClicks + 1
            }).exec()

            return res.json({msg:"Actualizado"})

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default WhatsappClick