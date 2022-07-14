import Icon from "@/ui/icons";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
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
import categories from '@/src/utils/user/brand/categories';
import { Card, Grid, Input, Text } from "@nextui-org/react";

const ClaimPositionModule = () => {

    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        brandName: "",
        isWholesaleAndRetail: null,
        category: "",
        shippingBy: "",
        payMethod: [],
        location: {
            zone: "",
            //this is in case of: la salada
            shed: "",
            stallNumber: "",
            hallwayNumber: "",
            rowNumber: "",
            //this is in case of: flores
            isInGallery: false,
            galleryName: "",
            positionInGallery: "",
            street: "",
            streetNumber: "",
        },
    })

    if (!user && false) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isSeller && false) {
        return (
            <ShouldBeSeller />
        )
    }

    const handleBrandName = (e) => {
        setState({ ...state, brandName: e.target.value })
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
                zone: v
            }
        })
    }

    const handleLocation = (key) => (e) => {
        if (key == "isInGallery") {
            return setState({
                ...state, location: {
                    ...state.location,
                    isInGallery: e.target.checked
                }
            })
        }
        setState({
            ...state, location: {
                ...state.location,
                [key]: e.target.value
            }
        })
    }

    const handleGenericString = (key) => e => {
        setState({
            ...state,
            [key]: e.target.value
        })
    }
    const handlePaymethod = (key) => e => {
        if (e.target.checked) {
            setState({
                ...state,
                payMethod: [...state.payMethod, key]
            })
        } else {
            setState({
                ...state,
                payMethod: state.payMethod.filter(x => x !== key)
            })
        }
    }

    //SUBMIT
    const submit = () => {
        const { zone } = state.location

        //zone: la salada
        const isInLaSalada = zone == "la salada"
        const isInUrkupiña = isInLaSalada && state.location.shed == "urkupiña"

        //zone: flores
        const isInFlores = zone == "flores"
        const isInGallery = isInFlores && state.location.isInGallery


        //CHECKING
        const Schema = Joi.object({
            brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
            isWholesaleAndRetail: Joi.boolean().valid(null, true, false).messages(booleanMessages("Forma de vender")),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            shippingBy: Joi.string().min(1).max(128).messages(stringMessages("Transporte de envios")),
            payMethod: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))),
            location: Joi.object({
                zone: Joi.string().valid("la salada", "flores", "online").messages(stringMessages("Donde planeas vender")),
                //in case of: la salada
                shed: Joi.string().valid("punta mogote", "urkupiña", "los coreanos", "oceans", "galerias", "").messages(stringMessages("Galpón")),
                stallNumber: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Numero de puesto")),
                hallwayNumber: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Numero de pasillo")),
                rowNumber: Joi.string().min(isInUrkupiña ? 1 : 0).max(32).messages(stringMessages("Numero de fila")),
                //In case of: flores
                isInGallery: Joi.boolean().messages(booleanMessages("Esta en una galeria")),
                galleryName: Joi.string().min(isInGallery ? 1 : 0).max(64).messages(stringMessages("Nombre de la galeria")),
                positionInGallery: Joi.string().min(isInGallery ? 1 : 0).max(32).messages(stringMessages("Numero en la galeria")),
                street: Joi.string().min(isInFlores ? 1 : 0).max(64).messages(stringMessages("Nombre de la calle")),
                streetNumber: Joi.string().min(isInFlores ? 1 : 0).max(32).messages(stringMessages("Altura de la calle"))
            })
        })

        const { error, value } = Schema.validate(state)

        if (error) {
            return toast.error(error.details[0].message)
        }
        if (isInLaSalada && state.location.shed == "") {
            return toast.error("Elige en que galpon planeas vender")
        }

        if (state.isWholesaleAndRetail == null) {
            return toast.error("Elige si vas a vender por menor o por mayor")
        }
        if (state.payMethod.length == 0) {
            return toast.error("Elige al menos un metodo de pago")
        }

        if (!error) {
            Put("user/auth/claimbrand", value).then(res => {
                toast(res.data.msg)
            }).catch(err => {
                if (err.response.data) {
                    toast.error(err.response.data);
                }
                toast.error("Ocurrio un error de nuestro lado")
            })
        }
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
                                    onChange={handleBrandName}
                                    iconRight={<Icon id="title" />}
                                    value={state.brandName}
                                    css={{w:"100%"}} />
                            </Grid>
                            <Grid>
                                <SellingMode isWholesaleAndRetail={state.isWholesaleAndRetail} onChange={handleSellingMode}/>
                            </Grid>
                        </Grid.Container>

                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )

}

export default ClaimPositionModule