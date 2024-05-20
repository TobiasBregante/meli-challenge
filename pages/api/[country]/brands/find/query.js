import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Brand from '@/src/models/brand/mongoose'
import DB from '@ConnectDb'
import Website from '@/models/website/mongoose'

const FindBrand = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            text, popular, premiunOnly, limit, isActive, category, zone, shed, hallway, galleryName, row, floor, side, getAll
        }
    } = req

    if (method == 'GET') {
        try {
            if (getAll) {

                return res.json(
                    await Brand.find({}, {
                        brandName: 1,
                        "location.zone": 1,
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

                const finder = await Website.find({}).lean()

                finder[0].categories = finder[0].categories.map(c => {
                    if (c.name == category) {
                        c.views = c.views + 1
                    }
                    return c
                })

                await Website.findByIdAndUpdate(finder[0]._id, {
                    ...finder[0]
                }).exec()
            }
            if (premiunOnly) {
                dbQuery = {
                    ...dbQuery,
                    isPremiun: premiunOnly == "true"
                }
            }

            //Location query
            if (zone && zone != "all") {
                dbQuery = {
                    ...dbQuery,
                    "location.zone": zone
                }
            }
            if (shed && shed != "all") {
                dbQuery = {
                    ...dbQuery,
                    "location.shed": shed
                }
            }
            if (hallway) {
                dbQuery = {
                    ...dbQuery,
                    "location.hallway": hallway
                }
            }
            if (galleryName) {
                dbQuery = {
                    ...dbQuery,
                    "location.galleryName": galleryName
                }
            }
            if (floor) {
                dbQuery = {
                    ...dbQuery,
                    "location.floor": floor
                }
            }
            if (row) {
                dbQuery = {
                    ...dbQuery,
                    "location.row": row
                }
            }
            if (side) {
                dbQuery = {
                    ...dbQuery,
                    "location.side": side
                }
            }


            let sorting = {}
            if (popular) {
                sorting = {
                    "stats.views": -1
                }
            }
            let hardLimit = 8
            if (limit) {
                hardLimit = limit
            }

            let finder = await Brand.find(dbQuery, {
                brandName: 1,
                stats: 1,
                imgs: 1,
                location: 1

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