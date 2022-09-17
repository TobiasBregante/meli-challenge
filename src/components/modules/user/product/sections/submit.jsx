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

const Submit = ({ state, setState, data, resetState }) => {

    const [isSubmiting, setSubmiting] = useState(false)
    const user = useUserContext()
    const router = useRouter()

    const handleClick = () => {
        setSubmiting(true)

        const retailPerUnit = state.prices.retail.isPerUnit.value
        const retailMode = (mode) => {
            if ((data?.brand?.isWholesaleAndRetail || user.brand.isWholesaleAndRetail) && retailPerUnit == mode) {
                return true
            }
            return false
        }

        const wholesaleSellMode = v => {
            if (data?.brand?.isWholesaleAndRetail || user.brand.isWholesaleAndRetail) {
                return false
            }
            if (state.prices.wholesale.perUnitTalk.value == true && v == 0) {
                return false
            }
            if (state.prices.wholesale.perDozenTalk.value == true && v == 1) {
                return false
            }
            if (state.prices.wholesale.perCurveTalk.value == true && v == 2) {
                return false
            }
            return state.prices.wholesale.sellMode.value == v
        }

        const isRequireBigQuantity = v=>{
            if (wholesaleSellMode(v)) {
                if (data?.brand?.isPremiun || user.status.isPremiun ) {
                    return true
                }
            }
            return false
        }

        const pricePerBigUnit = () => {
            const N = Number(state.prices.wholesale.pricePerUnit.value)
            if (N != NaN && N != 0) {
                return N - 1
            }
            return 1
        }

        const pricePerBigCurve = () => {
            const N = Number(state.prices.wholesale.pricePerCurve.value)
            if (N != NaN && N != 0) {
                return N - 1
            }
            return 1
        }

        const pricePerBigDozen = () => {
            const N = Number(state.prices.wholesale.pricePerDozen.value)
            if (N != NaN && N != 0) {
                return N - 1
            }
            return 1
        }

        //Pre check-in
        if ((data?.brand?.isWholesaleAndRetail || user.brand.isWholesaleAndRetail) && retailPerUnit == null) {
            setSubmiting(false)
            return toast("Elige una opción para venta por menor")
        }

        if (wholesaleSellMode(null)) {
            setSubmiting(false)
            return toast("Elige una opción para venta por mayor")
        }



        //CHECKING
        const Schema = Joi.object({
            title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de producto")),
            category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
            description: Joi.string().min(32).max(5000).messages(stringMessages("Descripción")),
            stock: Joi.number().min(0).max(999999).messages(numberMessages("Stock")),

            prices: Joi.object({
                retail: {
                    isPerUnit: Joi.boolean().valid(null, true, false).messages(booleanMessages("Por menor")),
                    minPerUnit: Joi.number().min(retailMode(true) ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima")),
                    pricePerUnit: Joi.number().min(retailMode(true) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad")),

                    minPerDozen: Joi.number().min(retailMode(false) ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima de docenas por menor")),
                    pricePerDozen: Joi.number().min(retailMode(false) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en la docena"))
                },
                wholesale: {
                    sellMode: Joi.number().min(0).max(2).messages(numberMessages("Modo de vender")),
                    perUnitTalk: Joi.boolean(),
                    minPerUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima")),
                    pricePerUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad")),
                    minPerBigUnit: Joi.number().min(isRequireBigQuantity(0) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de unidades en gran cantidad")),
                    pricePerBigUnit: Joi.number().min(isRequireBigQuantity(0) ? 1 : 0).max(pricePerBigUnit()).messages(numberMessages("Precio por unidad en venta de gran cantidad")),

                    perDozenTalk: Joi.boolean(),
                    minPerDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de docenas")),
                    pricePerDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en cada docena")),
                    minPerBigDozen: Joi.number().min(isRequireBigQuantity(1) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de docenas para gran cantidad")),
                    pricePerBigDozen: Joi.number().min(isRequireBigQuantity(1) ? 1 : 0).max(pricePerBigDozen()).messages(numberMessages("Precio por unidad en docenas de gran cantidad")),

                    perCurveTalk: Joi.boolean(),
                    sizesPerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Talles por curva")),
                    minPerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de curvas")),
                    pricePerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en la curva")),
                    minPerBigCurve: Joi.number().min(isRequireBigQuantity(2) ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima de curvas para gran cantidad")),
                    pricePerBigCurve: Joi.number().min(isRequireBigQuantity(2) ? 1 : 0).max(pricePerBigCurve()).messages(numberMessages("Precio por unidad para ventas en gran cantidad de curvas"))
                }
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
                retail: {
                    isPerUnit: state.prices.retail.isPerUnit.value,
                    minPerUnit: state.prices.retail.minPerUnit.value,
                    pricePerUnit: state.prices.retail.pricePerUnit.value,

                    minPerDozen: state.prices.retail.minPerDozen.value,
                    pricePerDozen: state.prices.retail.pricePerDozen.value
                },
                wholesale: {
                    sellMode: state.prices.wholesale.sellMode.value,

                    perUnitTalk: state.prices.wholesale.perUnitTalk.value,
                    minPerUnit: state.prices.wholesale.minPerUnit.value,
                    pricePerUnit: state.prices.wholesale.pricePerUnit.value,
                    minPerBigUnit: state.prices.wholesale.minPerBigUnit.value,
                    pricePerBigUnit: state.prices.wholesale.pricePerBigUnit.value,

                    perDozenTalk: state.prices.wholesale.perDozenTalk.value,
                    minPerDozen: state.prices.wholesale.minPerDozen.value,
                    pricePerDozen: state.prices.wholesale.pricePerDozen.value,
                    minPerBigDozen: state.prices.wholesale.minPerBigDozen.value,
                    pricePerBigDozen: state.prices.wholesale.pricePerBigDozen.value,

                    perCurveTalk: state.prices.wholesale.perCurveTalk.value,
                    sizesPerCurve: state.prices.wholesale.sizesPerCurve.value,
                    minPerCurve: state.prices.wholesale.minPerCurve.value,
                    pricePerCurve: state.prices.wholesale.pricePerCurve.value,
                    minPerBigCurve: state.prices.wholesale.minPerBigCurve.value,
                    pricePerBigCurve: state.prices.wholesale.pricePerBigCurve.value
                }
            }
        })


        if (error) {
            console.log(error);
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
                    return res.data.img_id
                })
                    .catch(err => {
                        console.log(err);
                        setSubmiting(false)
                        toast("Ocurrio un error de nuestro lado al subir las imagenes")
                        return false
                    })
            })
            const updateOrAdd = (body) => {
                if (data) {
                    Post(`products/product/${data._id}/update`, body, {
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
                    Put("products/add", body, {
                        headers: {
                            sldtoken: jsCookie.get("sldtoken")
                        }
                    }).then(res => {
                        toast(res.data.msg)
                        setSubmiting(false)
                        //esetState()

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
                const finalImgs = [...value.imgs.filter(x => typeof x !== "object"),...imgs]
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
                data?._id !== undefined ? "Actualizar" : "Añadir producto"
            }
        </Button>
    )
}


export default Submit