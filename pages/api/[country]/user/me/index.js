import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Brand from '@/src/models/brand/mongoose';
import Products from '@/src/models/products/mongoose'
import User from '@/models/user/mongoose'

const GetMyUserData = async (req, res) => {
    await cors(req, res)
    const {
        method,
    } = req

    if (method == 'GET') {
        try {

            const myProducts = await Products.find({ isOwnedBy: req.requestUser._id }).count()
            req.requestUser.products = myProducts

            const response = {}

            if (req.query.withBrand != undefined) {
                const finder = await Brand.findOne({
                    isOwnedBy: req.requestUser._id,
                }).lean()

                if (finder != null) {
                    req.requestUser.brand = finder
                }
            }
            const now = new Date()
            const hours = 24 * 60 * 1000;
            const timeLeft = Math.round((req.requestUser.status.isPremiunUntil - now) / hours)

            //Notify for premiun left time
            if (req.requestUser.status.isPremiun && timeLeft >= 0 && timeLeft <= 168) {
                //Check last reminder 
                if (req.requestUser.notifications.length == 0 || req.requestUser.notifications[req.requestUser.notifications.length - 1].title != "Tu subscripción a premiun esta por acabar") {

                    await User.findByIdAndUpdate(req.requestUser._id, {
                        $push: {
                            notifications: {
                                title: "Tu subscripción a premiun esta por acabar",
                                description: "Tu subscripción acabara pronto, contacta al soporte para renovar tu subscripción premiun y que tus productos sigan vigentes."
                            }
                        }
                    }).exec()
                }
            }

            if (req.requestUser.status.isPremiun && timeLeft <= 0) {
                //Check last reminder 
                if (req.requestUser.notifications.length == 0 || req.requestUser.notifications[req.requestUser.notifications.length - 1].title != "Tu subscripción a premiun a terminado") {

                    await User.findByIdAndUpdate(req.requestUser._id, {
                        "status.isPremiun": false,
                        $push: {
                            notifications: {
                                title: "Tu subscripción a premiun a terminado",
                                description: "Tu subscripción acabo, contacta al soporte para renovar tu subscripción premiun "
                            }
                        }
                    }).exec()

                    await Brand.findOneAndUpdate({ isOwnedBy: req.requestUser._id }, {
                        isPremiun: false,
                    }).exec()

                    const findLatestProducts = await Products.find({ isOwnedBy: req.requestUser._id }).sort({ createdAt: -1 }).lean()

                    findLatestProducts.forEach(async (product, i) => {
                        //remove everything except last 5 products by date
                        if (i > 4) {
                            await Products.findByIdAndDelete(product._id)
                        }
                    })
                    await Products.updateMany({ isOwnedBy: req.requestUser._id }, {
                        "status.isPremiun": false,
                    }).exec()
                }
            }



            return res.json(req.requestUser)



        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(GetMyUserData)