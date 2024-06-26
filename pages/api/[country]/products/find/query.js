import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import Products from '@/src/models/products/mongoose'
import Brand from '@/src/models/brand/mongoose'
import DB from '@ConnectDb'

const FindProducts = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            text, popular, brand_id, category, page, limit, product_category, country
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
            if (text) {
                dbQuery.title = new RegExp(`${text}`, 'i')
            }

            if (category) {
                dbQuery.category = category


                finder[0].categories = finder[0].categories.map(c => {
                    if (c?.name == category) {
                        c.views = c.views + 1
                    }
                    return c
                })
            }

            if (brand_id) {
                dbQuery.brand_id = brand_id
            }

            let sorting = {}

            if (popular) {
                sorting = {
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
                category: 1,
                brand_id: 1,
                description: 1,
                prices: 1,
                stock: 1,
            })
                .sort(sorting)
                .limit(hardLimit)
                .skip(skip)
                .limit(hardLimit)
                .lean()

            finder = finder

            if (finder.length == 0) {
                return res.status(404).json({ msg: "Sin resultados" })
            }
            const brandsFinder = finder.map(async product => await Brand.findById(product.brand_id).lean())

            return Promise.all(brandsFinder).then(brands => {
                finder = finder?.map((product, i) => ({
                    ...product,
                    brand: brands[i]
                }))

                return res?.json(finder)
            })

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default FindProducts