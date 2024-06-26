import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Brand from '@/src/models/brand/mongoose'
import DB from '@ConnectDb'

const FindBrand = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            text, popular, limit, isActive, category, shed, hallway, galleryName, row, floor, side, getAll
        }
    } = req

    if (method == 'GET') {
        try {
            if (getAll) {

                return res.json(
                    await Brand.find({}, {
                        brandName: 1,
                        isActive: 1,
                        isActiveUntil: 1,
                    })
                        .lean()
                )
            }
            let dbQuery = {
                isActiveUntil: {
                    $gte: new Date()
                },
            }
            if (isActive) {
                dbQuery = {
                    isActiveUntil: isActive == "true" ? { $gte: new Date() } : { $lte: new Date() }
                }
            }

            if (text) {
                dbQuery.brandName = new RegExp(`${text}`, 'i')
            }
            if (category) {
                dbQuery.category = category

                finder[0].categories = finder[0].categories.map(c => {
                    if (c.name == category) {
                        c.views = c.views + 1
                    }
                    return c
                })
            }

            let sorting = {}
          
            let hardLimit = 8
            if (limit) {
                hardLimit = limit
            }

            let finder = await Brand.find(dbQuery, {
                brandName: 1,
            })
                .sort(sorting)
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


export default FindBrand