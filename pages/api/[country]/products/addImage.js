import DB from "@ConnectDb"
import { methodNotAllowed, internalServerError, badRequest } from '@/utils/errors/index'
import userAuth from '@/src/middlewares/userAuth';
import formidable from "formidable";
import cloudinary from 'cloudinary'
import { nanoid } from 'nanoid';



const AddProductEndpoint = async (req, res) => {
    await DB()

    const {
        method,
        body,
    } = req

    if (method == 'POST') {
        try {const form = new formidable.IncomingForm();
            const newImgId = nanoid(32)

            return form.parse(req, async function (err, fields, files) {

                cloudinary.v2.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET
                });

                if(files?.file?.filepath) {
                    console.log(files?.file?.filepath)
                    cloudinary.v2.uploader.upload(files?.file?.filepath, {
                        filename_override: newImgId,
                        public_id: newImgId,
                    }, async (error) => {
                        
                        if (error) {
                            console.error(error);
                            return res.status(400).json({
                                msg: "Hubo un error al subir la imagen"
                            })
                        }
    
                        return res.json({
                            msg: "Imagen subida con exito",
                            img_id: newImgId
                        })
                    });
                } else {
                    return res.json({
                        msg: "Imagen subida con exito",
                        img_id: 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77'
                    })
                }


            });

        } catch (err) {
            return internalServerError(res, err)
        }
    }
    return methodNotAllowed(res)
}

export const config = {
    api: {
        bodyParser: false
    }
};

export default userAuth(AddProductEndpoint,true)