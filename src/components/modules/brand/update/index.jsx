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
import { Avatar, Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import Clasification from "@/components/modules/user/auth/claimBrand/sections/clasification";
import jsCookie from 'js-cookie'
import get from '@/utils/hooks/get'
import Post from "@/src/utils/hooks/post";
import timeago from "@/src/utils/timeago";
import Get from "@/utils/hooks/get";

const UpdateBrandModule = ({ website, data }) => {
    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        brandName: { error: "", value: data.brandName },
        isWholesaleAndRetail: data.isWholesaleAndRetail,
        category: { error: "", value: data.category },
        shippingBy: { error: "", value: data.shippingBy },
        payMethod: { error: "", value: data.payMethod },
        location: {
            zone: { error: "", value: data.location.zone },
            //this is in case of: la salada
            shed: { error: "", value: data.location.shed },
            stallNumber: { error: "", value: data.location.stallNumber },
            hallway: { error: "", value: data.location.hallway },
            row: { error: "", value: data.location.row },
            floor: { error: "", value: data.location.floor },
            side: { error: "", value: data.location.side },
            //this is in case of: flores
            isInGallery: data.location.isInGallery,
            galleryName: { error: "", value: data.location.galleryName },
            positionInGallery: { error: "", value: data.location.positionInGallery },
            street: { error: "", value: data.location.street },
            streetNumber: { error: "", value: data.location.streetNumber },
        },
    }),
        [isSubmiting, setSubmiting] = useState(false)



    if (!user) {
        return (
            <ShouldLogin />
        )
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
            return false
        }

        //CHECKING
        const Schema = Joi.object({
            brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
            isWholesaleAndRetail: Joi.boolean().valid(null, true, false).messages(booleanMessages("Forma de vender")),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            shippingBy: Joi.string().min(1).max(128).messages(stringMessages("Transporte de envios")),
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

        const { error, value } = Schema.validate({
            brandName: state.brandName.value,
            isWholesaleAndRetail: state.isWholesaleAndRetail,
            category: state.category.value,
            shippingBy: state.shippingBy.value,
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

        console.log(error);

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

            Post(`brands/brand/${data._id}/update`, value, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            }).then(res => {
                toast(res.data.msg)
                return setSubmiting(false)

            }).catch(err => {
                if (err.response.data) {
                    toast.error(err.response.data);
                }
                toast.error("Ocurrio un error de nuestro lado")
                setSubmiting(false)
            })
        }

    }


    const validateFor = (index) => {
        const now = new Date()
        const dates = ["now",
            new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
            new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()),
            new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()),
            new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())]

        Post(`brands/brand/${data._id}/update`, {
            isActiveUntil: dates[index]
        }, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).then(res => {
            toast(res.data.msg)
            return setSubmiting(false)

        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data);
            }
            toast.error("Ocurrio un error de nuestro lado")
            setSubmiting(false)
        })
    }

    const removeBrand = () => {
        setSubmiting(true)
        Get(`brands/brand/${data._id}/delete`, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).then(res => {
            toast(res.data.msg)
            setSubmiting(false)
            if (user.isAdmin) {
                return router.push("/./admin/search/brands")
            }
            router.push("/./")
        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data);
            }
            toast.error("Ocurrio un error de nuestro lado")
            setSubmiting(false)
        })
    }

    return (
        <Grid.Container justify="center" >
            <Grid xs={12} sm={9} >
                <Grid.Container direction="column">
                    <Card css={{ mb: 10 }}>
                        <Card.Header>
                            <Text h3>
                                Datos del vendedor
                            </Text>
                            <Avatar css={{ marginLeft: '$10' }} squared src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${data?.imgs?.principal || 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77'}`} />
                        </Card.Header>
                        <Card.Body>
                            <Text b h4>
                                Nombre: {data.ownerData.name}
                            </Text>
                            <Text b h4>
                                Email: {data.ownerData.email}
                            </Text>
                            <Text b h4>
                                Numero de celular: {data.ownerData.cellPhone}
                            </Text>
                        </Card.Body>
                    </Card>
                    <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                        <Card.Header>
                            <Grid.Container justify="center">
                                <Grid>
                                    <Text h3 weight="bold">
                                        Actualiza los datos de tu marca
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
                                {
                                    user.isAdmin &&
                                    <>
                                        <Card.Divider />
                                        <Text h3>
                                            Validar por:
                                        </Text>
                                        <Grid.Container>
                                            <Button auto color="error" icon={<Icon id="arrow_downward" color="white" />} onPress={() => validateFor(0)}>
                                                Suspender
                                            </Button>
                                            <Button auto color="success" icon={<Icon id="date_range" />} css={{ color: "$dark", mx: 10 }} onPress={() => validateFor(4)}>
                                                Activar
                                            </Button>
                                        </Grid.Container>
                                        <Text css={{ mt: 20 }}>
                                            Vence: {timeago(data.isActiveUntil) == "justo ahora" ? "Ya vencio" : timeago(data.isActiveUntil)}
                                        </Text>
                                    </>
                                }
                            </Grid.Container>
                            <Grid.Container justify="space-between">
                                <Button auto
                                    color="error"
                                    css={{ color: "$white", mt: 10 }}
                                    iconRight={isSubmiting ?
                                        <Loading type="points" color="currentColor" size="sm" /> : <Icon id="delete" color="white" />}
                                    disabled={isSubmiting}
                                    onPress={removeBrand}>
                                    Eliminar marca
                                </Button>
                                <Button auto
                                    color="secondary"
                                    css={{ color: "$dark", mt: 10 }}
                                    iconRight={<Icon id="arrow_upward" />}
                                    disabled={isSubmiting}
                                    onPress={submit}>
                                    {
                                        isSubmiting &&
                                        <Loading type="points" color="currentColor" size="sm" />
                                    }
                                    Actualizar
                                </Button>
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )

}

export default UpdateBrandModule