import Icon from "@/src/components/ui/icons"
import Put from "@/src/utils/hooks/put"
import stringMessages, { booleanMessages, numberMessages } from "@/src/utils/joi/customMessages"
import { useUserContext } from "@/src/utils/user/provider"
import { Button, Loading } from "@nextui-org/react"
import Joi from "joi"
import { useState } from "react"
import { toast } from "react-toastify"
import jsCookie from 'js-cookie'
import Post from "@/src/utils/hooks/post"
import { useRouter } from "next/router"

const Submit = ({ state, setState, data, resetState, showInput, mailState }) => {

 

    const [isSubmiting, setSubmiting] = useState(false)
    const user = useUserContext()
    const router = useRouter()

    const handleClick = () => {
        setSubmiting(true)

        const sellingBy = (type) => {
            
            if (data?.prices?.minPerWholesale > 0 && type=== "base") {
                //we use minPerWholesale instead of wholesale because perQuantity also set wholesale value
                return true
            }
            
            if (data?.prices?.perDozen > 0 && type=== "dozen") {
                return true
            }
            if (data?.prices?.perQuantity > 0 && type=== "quantity") {
                return true
            }
            
            if (data?.prices?.perCurve > 0 && type=== "curve") {
                return true
            }
            if (data?.prices?.perTask > 0 && type=== "task") {
                return true
            }

            if (router.query.sellingPer === undefined) {
                return false
            }
            return router.query.sellingPer === type
        }

        const perQuantityCheck = () => {
            if (router.query.sellingPer === "quantity" || data?.prices?.perQuantity) {
                return parseInt(state.prices.wholesale.value) - 1
            }
            return 0
        }

        //CHECKING
        const Schema = Joi.object({
            title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de producto")),
            category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
            description: Joi.string().min(32).max(5000).messages(stringMessages("Descripción")),
            stock: Joi.number().min(0).max(999999).messages(numberMessages("Stock")),

            prices: Joi.object({
                retail: Joi.number().min(sellingBy("base") ? 1 : 0).max(999999).messages(numberMessages("Por menor")),

                minPerWholesale: Joi.number().min(sellingBy("base") ? 1 : 0).max(999999).messages(numberMessages("Minimo por mayor")),
                wholesale: Joi.number().min(sellingBy("base") ? 1 : 0).max(999999).messages(numberMessages("Por mayor")),

                minPerDozen: Joi.number().min(sellingBy("dozen") ? 1 : 0).max(999999).messages(numberMessages("Minimo por docena")),
                perDozen: Joi.number().min(sellingBy("dozen") ? 1 : 0).max(999999).messages(numberMessages("Por docena")),

                minPerQuantity: Joi.number().min(sellingBy("quantity") ? 1 : 0).max(999999).messages(numberMessages("Minimo por cantidad")),
                perQuantity: Joi.number().min(sellingBy("quantity") ? 1 : 0).max(perQuantityCheck()).messages(numberMessages("Precio por cantidad")),
                typePerQuantity: Joi.string().min(sellingBy("quantity") ? 1 : 0).max(32).messages(stringMessages("Tipo por cantidad")),

                minPerCurve: Joi.number().min(sellingBy("curve") ? 1 : 0).max(999999).messages(numberMessages("Minimo por curva")),
                perCurve: Joi.number().min(sellingBy("curve") ? 1 : 0).max(999999).messages(numberMessages("Por curva")),

                minPerTask: Joi.number().min(sellingBy("task") ? 1 : 0).max(999999).messages(numberMessages("Minimo por tarea")),
                perTask: Joi.number().min(sellingBy("task") ? 1 : 0).max(999999).messages(numberMessages("Por tarea"))
            }),
            imgs: Joi.array(),
            
        })

        const { error, value } = Schema.validate({
            title: state.title.value,
            category: state.category.value,
            description: state.description.value,
            stock: state.stock.value,
            imgs: state.imgs.value,
            prices: {
                retail: state.prices.retail.value,

                minPerWholesale: state.prices.minPerWholesale.value,
                wholesale: state.prices.wholesale.value,

                minPerDozen: state.prices.minPerDozen.value,
                perDozen: state.prices.perDozen.value,

                minPerQuantity: state.prices.minPerQuantity.value,
                perQuantity: state.prices.perQuantity.value,
                typePerQuantity: state.prices.typePerQuantity.value,

                minPerCurve: state.prices.minPerCurve.value,
                perCurve: state.prices.perCurve.value,

                minPerTask: state.prices.minPerTask.value,
                perTask: state.prices.perTask.value,
            }
        })

        

      

        if (error) {
            console.error(error);
            setSubmiting(false)
            //Find sub low level error path
            if (error.details[0].path.length == 3) {
                return setState({
                    ...state,
                    //High level like "title"
                    [error.details[0].path[0]]: {
                        ...state[error.details[0].path[0]],
                        //second level like "retail"
                        [error.details[0].path[1]]: {
                            ...state[error.details[0].path[0]][error.details[0].path[1]],
                            //third level like "isPerUnit"
                            [error.details[0].path[2]]: {
                                value: state[error.details[0].path[0]][error.details[0].path[1]][error.details[0].path[2]].value,
                                error: error.details[0].message
                            }
                        }
                    }
                })
            }
            //Find sub level error path
            if (error.details[0].path.length == 2) {
                return setState({
                    ...state,
                    [error.details[0].path[0]]: {
                        ...state[error.details[0].path[0]],
                        [error.details[0].path[1]]: {
                            value: state[error.details[0].path[0]][error.details[0].path[1]].value,
                            error: error.details[0].message
                        }
                    }
                })
            }
            return setState({
                ...state,
                [error.details[0].path[0]]: {
                    value: state[error.details[0].path[0]].value,
                    error: error.details[0].message
                }
            })
        }

        if (state.imgs.value.length === 0) {
            setSubmiting(false)
            return toast("Añade al menos una imagen")
        }

        if (!error) {
            const uploadImages = value.imgs.filter(x => typeof x === "object").map(async img => {
                let formImage = new FormData();
                formImage.append("file", img)

                return Post("products/addImage", formImage, {
                    headers: {
                        sldtoken: jsCookie.get("sldtoken"),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(res => {
                    return res.data.img_id || 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77'
                })
                    .catch(err => {
                        console.error(err);
                        setSubmiting(false)
                        toast("Ocurrio un error de nuestro lado al subir las imagenes")
                        return false
                    })
            })

            

            const updateOrAdd = (body) => {
               
                if (data) {
                    Post(`products/product/${data._id}/update`, 
                    {
                        ...body, 
                    ...(email && email)
                    }, {
                        headers: {
                            sldtoken: jsCookie.get("sldtoken")
                        }
                    }).then(res => {
                        toast(res.data.msg)
                        setSubmiting(false)
                        resetState()

                    }).catch(err => {
                        if (err.response.data) {
                            toast.error(err.response.data);
                        }
                        toast.error("Ocurrio un error de nuestro lado")
                        setSubmiting(false)
                    })
               } else {
                    Put("products/add", 
                    {
                    ...body, 
                    ...(showInput && mailState.length && {email: mailState})
                    },
                     {
                        headers: {
                            sldtoken: jsCookie.get("sldtoken")
                        }
                    }).then(res => {
                        toast(res.data.msg)
                        setSubmiting(false)
                        router.push("/./")

                    }).catch(err => {
                        if (err.response.data) {
                            toast.error(err.response.data);
                        }
                        toast.error("Ocurrio un error de nuestro lado")
                        setSubmiting(false)
                    })
                }
            }

            Promise.all(uploadImages).then(imgs => {
                const finalImgs = [...value.imgs.filter(x => typeof x !== "object"), ...imgs]
                updateOrAdd({ ...value, imgs: finalImgs })
            })


        }

    }

    return (
        <Button
            auto
            color="secondary"
            css={{ color: "$dark" }}
            iconRight={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="add" />}
            disabled={isSubmiting}
            onPress={handleClick}>
            {
                data?._id !== undefined ? "Actualizar" : "Guardar producto"
            }
        </Button>
    )
}


export default Submit