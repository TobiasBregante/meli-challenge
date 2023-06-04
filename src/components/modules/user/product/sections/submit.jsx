import Icon from "@/src/components/ui/icons"
import Put from "@/src/utils/hooks/put"
import stringMessages, { numberMessages } from "@/src/utils/joi/customMessages"
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

        //CHECKING
        const Schema = Joi.object({
            title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de producto")),
            category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
            description: Joi.string().min(32).max(5000).messages(stringMessages("Descripción")),
            prices: Joi.object({
                retail: Joi.number().min(1).max(999999999999999999999).messages(numberMessages("Por menor")),
            }),
            imgs: Joi.array(),
        })

        const { error, value } = Schema.validate({
            title: state.title.value,
            category: state.category.value,
            description: state.description.value,
            imgs: state.imgs.value,
            prices: {
                retail: state.prices.retail.value,
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
                    return res.data.img_id || 'uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY'
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
            css={{ color: "$white" }}
            iconRight={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon css={{ color: '$white' }} id="add" />}
            disabled={isSubmiting}
            onPress={handleClick}>
            {
                data?._id !== undefined ? "Actualizar" : "Guardar producto"
            }
        </Button>
    )
}


export default Submit