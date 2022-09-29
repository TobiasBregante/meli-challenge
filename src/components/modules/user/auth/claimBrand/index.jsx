import Icon from "@/ui/icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import CantRegisterBrand from '@/components/modules/user/errors/cantRegisterBrand'
import SellingMode from '@/components/modules/user/auth/claimBrand/sections/sellingMode'
import SellZone from '@/components/modules/user/auth/claimBrand/sections/sellZone'
//Section: Zones
import SaladaZone from '@/components/modules/user/auth/claimBrand/sections/saladaZone'
import FloresZone from '@/components/modules/user/auth/claimBrand/sections/floresZone'
//Validation
import { numberMessages, stringMessages, booleanMessages } from '@/utils/joi/customMessages'
import Joi from 'joi';
import { toast } from 'react-toastify'
import Put from '@/src/utils/hooks/put';
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import Clasification from "./sections/clasification";
import jsCookie from 'js-cookie'
import BrandImages from './sections/images'
import Post from "@/src/utils/hooks/post";

const ClaimPositionModule = ({ website }) => {

    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        brandName: { error: "", value: "" },
        isWholesaleAndRetail: null,
        category: { error: "", value: "" },
        shippingBy: { error: "", value: "" },
        payMethod: { error: "", value: [] },
        imgs: {
            principal: "",
            background: ""
        },
        location: {
            zone: { error: "", value: "" },
            //this is in case of: la salada
            shed: { error: "", value: "" },
            stallNumber: { error: "", value: "" },
            hallway: { error: "", value: "" },
            row: { error: "", value: "" },
            floor: { error: "", value: "" },
            side: { error: "", value: "" },
            //this is in case of: flores
            isInGallery: false,
            galleryName: { error: "", value: "" },
            positionInGallery: { error: "", value: "" },
            street: { error: "", value: "" },
            streetNumber: { error: "", value: "" },
        },
    }),
        [isSubmiting, setSubmiting] = useState(false)



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

    if (user.brand != undefined) {
        return <CantRegisterBrand />
    }

    const handleBrandName = (e) => {
        setState({
            ...state, brandName: {
                error: "",
                value: e.target.value
            }
        })
    }

    const handleSellingMode = (value) => (e) => {
        setState({
            ...state,
            isWholesaleAndRetail: value
        })
    }

    const handleZone = (v) => {
        setState({
            ...state, location: {
                ...state.location,
                zone: {
                    error: "",
                    value: v
                }
            }
        })
    }

    const handleLocation = (key) => (e) => {
        if (key == "isInGallery") {
            return setState({
                ...state, location: {
                    ...state.location,
                    isInGallery: e
                }
            })
        }
        setState({
            ...state, location: {
                ...state.location,
                [key]: {
                    error: "",
                    value: e.target.value
                }
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

    //SUBMIT
    const submit = () => {

        setSubmiting(true)
        const zone = state.location.zone.value

        //zone: la salada
        const isInLaSalada = zone == "la salada"

        //zone: flores
        const isInFlores = zone == "flores"
        const isInGallery = () => {
            if (isInFlores && state.location.isInGallery) {
                return true
            }
            if (isInLaSalada && state.location.shed.value == "GALERIAS") {
                return false
            }
            return false
        }

        //CHECKING
        const Schema = Joi.object({
            brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
            isWholesaleAndRetail: Joi.boolean().valid(null, true, false).messages(booleanMessages("Forma de vender")),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            shippingBy: Joi.string().min(1).max(128).messages(stringMessages("Transporte de envios")),
            imgs: Joi.object({
                principal: Joi.string(),
                background: Joi.string()
            }),
            payMethod: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))),
            location: Joi.object({
                zone: Joi.string().messages(stringMessages("Donde planeas vender")),
                //in case of: la salada
                shed: Joi.string().min(isInLaSalada ? 1 : 0).messages(stringMessages("Galpón")),
                stallNumber: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Numero de puesto")),
                hallway: Joi.string().min(0).max(32).messages(stringMessages("Numero de pasillo")),
                row: Joi.string().min(0).max(32).messages(stringMessages("Numero de fila")),
                floor: Joi.string().min(0).max(32).messages(stringMessages("Piso")),
                side: Joi.string().min(0).max(32).messages(stringMessages("Lado")),
                //In case of: flores
                isInGallery: Joi.boolean().messages(booleanMessages("Esta en una galeria")),
                galleryName: Joi.string().min(isInGallery() ? 1 : 0).max(64).messages(stringMessages("Nombre de la galeria")),
                positionInGallery: Joi.string().min(isInGallery() ? 1 : 0).max(32).messages(stringMessages("Numero en la galeria")),
                street: Joi.string().min(isInFlores ? 1 : 0).max(64).messages(stringMessages("Nombre de la calle")),
                streetNumber: Joi.string().min(isInFlores ? 1 : 0).max(32).messages(stringMessages("Altura de la calle"))
            })
        })

        let formImage = new FormData();
        formImage.append("file", state.imgs.principal)

        Post("products/addImage", formImage, {
            headers: {
                sldtoken: jsCookie.get("sldtoken"),
                "Content-Type": "multipart/form-data"
            }
        }).then(resx => {

            const { error, value } = Schema.validate({
                brandName: state.brandName.value,
                isWholesaleAndRetail: state.isWholesaleAndRetail,
                category: state.category.value,
                shippingBy: state.shippingBy.value,
                imgs: {
                    principal: resx.data.img_id,
                },
                payMethod: state.payMethod.value,
                location: {
                    zone: state.location.zone.value,
                    shed: state.location.shed.value,
                    stallNumber: state.location.stallNumber.value,
                    hallway: state.location.hallway.value,
                    row: state.location.row.value,
                    floor: state.location.floor.value,
                    side: state.location.side.value,
                    isInGallery: state.location.isInGallery,
                    galleryName: state.location.galleryName.value,
                    positionInGallery: state.location.positionInGallery.value,
                    street: state.location.street.value,
                    streetNumber: state.location.streetNumber.value,
                }
            })


            if (state.isWholesaleAndRetail == null) {
                setSubmiting(false)
                toast.error("Elige si vas a vender por menor o por mayor")
            }
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
                console.log(error);
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

            if (isInLaSalada && state.location.shed.value == "") {
                setSubmiting(false)
                return toast.error("Elige en que galpon planeas vender")
            }


            if (!error) {

                Put("user/auth/claimbrand", value, {
                    headers: {
                        sldtoken: jsCookie.get("sldtoken")
                    }
                }).then(res => {
                    toast(res.data.msg)
                    setSubmiting(false)
                    router.push("/./user/products/add")
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
                console.log(err);
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
                                    Añade los datos de tu marca
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
                                <BrandImages state={state.imgs} onChange={handleImgs} />
                            </Grid>
                            <Grid css={{ mt: 5 }}>
                                <SellingMode isWholesaleAndRetail={state.isWholesaleAndRetail} onChange={handleSellingMode} />
                            </Grid>
                            <Grid>
                                <Clasification state={state} onChange={handleGenericString} website={website} />
                            </Grid>
                            <Grid>
                                <SellZone zone={state.location.zone} onClick={handleZone} />
                            </Grid>
                            <Grid>
                                {
                                    state.location.zone.value == "la salada" &&
                                    <SaladaZone state={state.location} onChange={handleLocation} />
                                }
                                {
                                    state.location.zone.value == "flores" &&
                                    <FloresZone state={state.location} onChange={handleLocation} />
                                }
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
                                Registrar marca
                            </Button>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )

}

export default ClaimPositionModule