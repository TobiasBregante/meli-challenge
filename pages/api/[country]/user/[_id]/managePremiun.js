import { methodNotAllowed, internalServerError } from '@/utils/errors/index'
import cors from '@Cors'
import userAuth from '@/src/middlewares/userAuth';
import Brand from '@/src/models/brand/mongoose';
import Products from '@/src/models/products/mongoose'
import User from '@/src/models/user/mongoose'
import DB from '@ConnectDb'

const ManageUserPremiun = async (req, res) => {
    await cors(req, res)
    await DB()
    const {
        method,
        query: {
            _id, upgrade, downgrade, plan, date
        }
    } = req

    if (method == 'GET') {
        try {
            if (req.requestUser.isAdmin == false) {
                return res.status(401).json({ msg: "No estas autorizado a hacer esta acción" })
            }

            const now = new Date();
            let premiunUntil = ""
            if (upgrade && date == "week") {
                premiunUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
               
            }
            if (upgrade && date == "month") {
                premiunUntil = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
            }
            if (upgrade && date == "year") {
                premiunUntil = new Date(now.getFullYear()+1, now.getMonth(), now.getDate())
            }
            
            if (upgrade && plan && date) {
                await User.findOneAndUpdate({ _id: _id }, {
                    "status.isPremiun": true,
                    "status.isPremiunUntil": premiunUntil, 
                    "status.premiunPlan": plan,

                    $push:{
                        notifications: {
                            title: "Ahora eres premiun",
                            description: "Ya eres, premiun y estaras disfrutando de todos sus beneficios"
                        }
                    }
                    
                }).exec()


                await Brand.findOneAndUpdate({ isOwnedBy: _id }, {
                    isPremiun: true,
                    isActiveUntil: premiunUntil,
                }).exec()
                
                await Products.updateMany({isOwnedBy: _id}, {
                    "status.isPremiun":true,
                }).exec()
                
            }

            if (downgrade) {
                await User.findOneAndUpdate({ _id: _id }, {
                    "status.isPremiun": false,
                    "status.isPremiunUntil": now,

                    $push:{
                        notifications: {
                            title: "Te hemos sacado tu acceso a premiun",
                            description: "Contacta a soporte para saber porque hemos tomado esta decisión."
                        }
                    }
                }).exec()
    
    
                await Brand.findOneAndUpdate({ isOwnedBy: _id },{
                    isPremiun: false,
                    isActiveUntil: now
                }).exec()
                
                await Products.updateMany({isOwnedBy: _id}, {
                    "status.isPremiun":false,
                }).exec()
            }

            return res.json({msg:"Actualizado"})



        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}


export default userAuth(ManageUserPremiun)