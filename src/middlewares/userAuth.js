import jwt from 'jsonwebtoken';
import MongoUser from '@/models/user/mongoose'
import Cors from "@Cors"
import DB from "@ConnectDb"
import {internalServerError, unauthorized} from '@/utils/errors/index'

const userAuth = (handler, required=true) => {
    return async (req, res) => {
        //Handle cors here as well in handler function
        await Cors(req,res)
        await DB()
        // Get token and check if it exists
        let token = false

        //ACCESS TO THE TOKEN CAN BE GET FROM MULTIPLE PLACES IN ORDER TO GET FLEXIBILITY
        if (req.cookies && req.cookies.sldtoken) {
            token = req.cookies.sldtoken;
        }
        if (req.headers && req.headers['sldtoken']) {
            token = req.headers['sldtoken'].split(' ')[1]
        }
        //SOMETIMES HEADERS COME IN A OBJECT TYPE
        if (req.headers && req.headers.sldtoken) {
            token = req.headers.sldtoken
        }
        if (req.body && req.body.sldtoken) {
            token = req.body.sldtoken
        }

        if (token == false && required) {
            return res.status(401).json({
                msg: "Token no fue encontrado",
            });
        }

        try {
            // Verify token
            if (token != false) {

                jwt.verify(token, process.env.JWT_USER_AUTH_KEY, async(err, payload) => {
                    if (err && required) {
                        return unauthorized(res,"Hubo un error con tu token")
                    }
    
                    //THIS IS A GOOD PLACE TO GET VALIDATE IN BD TOKEN
    
                    const checkUser = await MongoUser.findById(payload._id,{
                        password:0
                    }).lean()
    
                    if (!checkUser && required) {
                        return unauthorized(res,"No encontramos ese usuario")
                    }
    
                    req.requestUser = checkUser;
    
                    return handler(req, res)
                })
            }else{
                return handler(req, res)
            }
            //IF AUTH IS NOT REQUIRED JUST CONTINUE

        } catch (err) {
            return internalServerError(res, err)
        }
    };
};

export default userAuth