import Icon from "@/ui/icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import CantRegisterBrand from '@/components/modules/user/errors/cantRegisterBrand'
//Validation
import { stringMessages } from '@/utils/joi/customMessages'
import Joi from 'joi';
import { toast } from 'react-toastify'
import Put from '@/src/utils/hooks/put';
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import Clasification from "@/components/modules/user/auth/claimBrand/sections/clasification";
import jsCookie from 'js-cookie'
import BrandImages from '@/components/modules/user/auth/claimBrand/sections/images'
import Post from "@/src/utils/hooks/post";

const UpdateBrandModule = ({ website, data }) => {
    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        brandName: { error: "", value: data?.brandName },
        category: { error: "", value: data?.category },
        payMethod: { error: "", value: data?.payMethod },
        imgs: {
            principal: data?.imgs?.principal || "uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY",
            background: ""
        },
        location: {
            zone: { error: "", value: "online" }
        },
    })
    const [isSubmiting, setSubmiting] = useState(false)

    const handleBrandName = (e) => {
        setState({
            ...state, brandName: {
                error: "",
                value: e.target.value
            }
        })
    }

    const handleGenericString = (key) => e => {
        setState({
            ...state,
            [key]: {
                error: "",
                value: e.target.value
            }
        })
    }

    const handleImgs = (key) => e => {
        setState({
            ...state,
            imgs: {
                ...state.imgs,
                [key]: e
            }
        })
    }

    useEffect(() => {
        if (user) {
            handleImgs()
        }
    }, [user])

    if (!user) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isSeller) {
        return (
            <ShouldBeSeller />
        )
    }

    //SUBMIT
    const submit = () => {
        setSubmiting(true)

        //CHECKING
        const Schema = Joi.object({
            brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            imgs: Joi.object({
                principal: Joi.string(),
                background: Joi.string()
            }),
            payMethod: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))),
            location: Joi.object({
                zone: Joi.string().messages(stringMessages("Donde planeas vender")),
            })
        })

        let formImage = new FormData();
        formImage.append("file", state?.imgs?.principal)
        const verifyImage = formImage || {
            name: 'url',
            size: 142134,
            type: 'image/jpge',
            webkitRelativePath: ""
        }
        Post("products/addImage", verifyImage, {
            headers: {
                sldtoken: jsCookie.get("sldtoken"),
                "Content-Type": "multipart/form-data"
            }
        }).then(resx => {
            const { error, value } = Schema.validate({
                brandName: state.brandName.value,
                category: state.category.value,
                ...(state?.imgs?.principal?.name && { imgs: {
                    principal: resx?.data?.img_id || state?.imgs?.principal,
                }}),
                payMethod: state.payMethod.value,
                location: {
                    zone: 'online'
                }
            })
            let updateData = value

            if (state.payMethod.value.length == 0) {
                setSubmiting(false)
                return setState({
                    ...state,
                    payMethod: {
                        value: [],
                        error: "Elige al menos un metodo de pago"
                    }
                })
            }


            if (error) {
                setSubmiting(false)
                console.error(error);
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

            if (data?._id && updateData && !error) {
                Post(`brands/brand/${data?._id}/update`, updateData, {
                    headers: {
                        sldtoken: jsCookie.get("sldtoken")
                    }
                }).then(res => {
                    toast(res.data.msg)
                    setSubmiting(false)
                    return router?.push(`/./${router?.locale}/brand/${data?._id}`)
    
                }).catch(err => {
                    if (err.response.data) {
                        toast.error(err.response.data);
                    }
                    toast.error("Ocurrio un error de nuestro lado")
                    setSubmiting(false)
                })
            }
        })
        .catch(err => {
            console.error(err);
            setSubmiting(false)
            toast("Ocurrio un error de nuestro lado al subir las imagenes")
            return false
        })
    }

    return (
        <Grid.Container justify="center" css={{ my: 20 }}>
            <Grid xs={12} sm={4} >
                <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                    <Card.Header>
                        <Grid.Container justify="center">
                            <Grid>
                                <Text h3 weight="bold">
                                    Actualizar marca
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body>
                        <Grid.Container >
                            <Icon id="info" />
                            <Text weight="bold" h4>
                                Información:
                            </Text>
                        </Grid.Container>
                        <Grid.Container direction="column" gap={1}>
                            <Grid>
                                <Input
                                    clearable
                                    label="Nombre de la marca"
                                    placeholder="Escribe aqui"
                                    helperText={state.brandName.error}
                                    helperColor="error"
                                    status={state.brandName.error ? "error" : "default"}
                                    onChange={handleBrandName}
                                    contentLeft={<Icon id="title" />}
                                    value={state.brandName.value}
                                    css={{ w: "100%" }} />
                            </Grid>
                            <Grid>
                                <BrandImages state={state?.imgs} onChange={handleImgs} />
                            </Grid>
                            <Grid>
                                <Clasification state={state} onChange={handleGenericString} website={website} />
                            </Grid>
                        </Grid.Container>
                        <Grid.Container justify="center">
                            <Button auto
                                color="secondary"
                                css={{ color: "$dark" }}
                                iconRight={<Icon id="add_business" />}
                                disabled={isSubmiting}
                                onPress={submit}>
                                {
                                    isSubmiting &&
                                    <Loading type="points" color="currentColor" size="sm" />
                                }
                                Actualizar marca
                            </Button>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )

}

export default UpdateBrandModule