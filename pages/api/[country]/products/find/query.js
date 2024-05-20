import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import Brand from '@/src/models/brand/mongoose'
import DB from '@ConnectDb'
import Website from '@/models/website/mongoose'
import withTax from '@/src/utils/product/tax'


const FindProducts = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            text, popular, premiunOnly, brand_id, isPublic, category, page, limit, product_category, country, level
        }
    } = req

    if (method === 'GET') {
        try {
            let dbQuery = {
            }
            if (country) {
                dbQuery = {
                    ...dbQuery,
                }
            }
            if (isPublic) {
                dbQuery = {
                    "status.isPublic": isPublic == "true",
                }
            }
            if (text) {
                dbQuery.title = new RegExp(`${text}`, 'i')
            }

            if (category) {
                dbQuery.category = category

                const finder = await Website.find({}).lean()

                finder[0].categories = finder[0].categories.map(c => {
                    if (c?.name == category) {
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
                    "status.isPremiun": premiunOnly == "true"
                }
            }

            if (brand_id) {
                dbQuery.brand_id = brand_id
            }

            let sorting = {}

            if (popular) {
                sorting = {
                    "stats.views": -1,
                    "createdAt": -1
                }
            }
            let hardLimit = 10

            if (limit) {
                hardLimit = limit
            }

            if (product_category) {
                dbQuery.category = product_category
            }

            let skip = 0;
            if (page) {
                const pageInt = parseInt(page);
                if (!isNaN(pageInt) && pageInt > 0) {
                    skip = (pageInt - 1) * hardLimit;
                }
            }

            let finder = await Products.find(dbQuery, {
                title: 1,
                imgs: 1,
                category: 1,
                brand_id: 1,
                description: 1,
                comments: 1,
                prices: 1,
                stock: 1,
            })
                .sort(sorting)
                .limit(hardLimit)
                .skip(skip)
                .limit(hardLimit)
                .lean()

            finder = withTax(finder, false)

            if (finder.length == 0) {
                return res.status(404).json({ msg: "Sin resultados" })
            }
            const brandsFinder = finder.map(async product => await Brand.findById(product.brand_id).lean())

            return Promise.all(brandsFinder).then(brands => {
                finder = finder?.map((product, i) => ({
                    ...product,
                    brand: brands[i]
                }))

                if (level) {
                    return res?.json({ count: finder?.length })
                }

                return res?.json(finder)
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default FindProducts