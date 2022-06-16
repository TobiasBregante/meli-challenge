import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import Button from "@/ui/buttons"
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import Select from '@/ui/selects';
import Checkbox from '@/src/components/ui/inputs/checkbox';
import SellingMode from '@/components/modules/user/auth/claimBrand/sections/sellingMode'
import SellZone from '@/components/modules/user/auth/claimBrand/sections/sellZone'
//Section: Zones
import SaladaZone from '@/components/modules/user/auth/claimBrand/sections/saladaZone'
import FloresZone from '@/components/modules/user/auth/claimBrand/sections/floresZone'
//Validation
import { numberMessages, stringMessages, booleanMessages } from '@/utils/joi/customMessages'
import Joi from 'joi';
import { toast } from 'react-toastify'

const ClaimPositionModule = () => {

    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        name: "",
        category: "",
        stock:0,
        description: "",
        retail:{
            isPerUnitOrDozen:null,
            perUnit:{
                minimumForShipment:0,
                priceForWholeSale:0
            },
            perDozen:{
                minimumForShipment:0,
                pricePerUnitPerDozen:0,
                pricePerDozen:0
            }
        },
        wholesale:{
            sellingMode: "",//Should be por unidad, por docena, por curva
            perUnit:{
                minimumForShipment:0,
                priceForWholeSale:0
            },
            perDozen:{
                minimumForShipment:0,
                pricePerUnitPerDozen:0,
                
            }
        }
    })

    if (false) {
        return (
            <ShouldLogin />
        )
    }
    if (false) {
        return (
            <ShouldBeSeller />
        )
    }

    const handleBrandName = (e) => {
        setState({ ...state, brandName: e.target.value })
    }

    const handleSellingMode = (key) => (e) => {
        setState({
            ...state, sellingMode: {
                ...state.sellingMode,
                [key]: e.target.checked
            }
        })
    }
    const handlePrivacy = (key) => (e) => {
        setState({
            ...state, privacy: {
                ...state.privacy,
                [key]: e.target.checked
            }
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
            brandName: Joi.string().min(2).max(32).messages(stringMessages("Nombre de la marca")),
            sellingMode: Joi.object({
                wholesale: Joi.boolean().messages(booleanMessages("mayorista")),
                retail: Joi.boolean().messages(booleanMessages("minorista"))
            }).required(),
            privacy: Joi.object({
                phoneVisible: Joi.boolean().messages(booleanMessages("Visibilidad del celular")),
            }),
            location: Joi.object({
                zone: Joi.string().min(0).max(16).valid("la salada", "flores", "online").messages(stringMessages("Ubicación")),
                //in case of: la salada
                shed: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Galpón")),
                stallPosition: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Numero de puesto")),
                hallwayNumber: Joi.string().min(isInLaSalada ? 1 : 0).max(32).messages(stringMessages("Numero de pasillo")),
                rowNumber: Joi.string().min(isInUrkupiña ? 1 : 0).max(32).messages(stringMessages("Nombre de marca")),
                //In case of: flores
                isInGallery: Joi.boolean().messages(booleanMessages("Esta en una galeria")),
                galleryName: Joi.string().min(isInGallery ? 1 : 0).max(32).messages(stringMessages("Nombre de la galeria")),
                positionInGallery: Joi.string().min(isInGallery ? 1 : 0).max(32).messages(stringMessages("Posicion en la galeria")),
                street: Joi.string().min(isInFlores ? 1 : 0).max(32).messages(stringMessages("Nombre de la calle")),
                streetNumber: Joi.string().min(isInFlores ? 1 : 0).max(32).messages(stringMessages("Numero de calle"))
            }),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            shippingBy: Joi.string().min(1).max(128).messages(stringMessages("Transporte de envios")),
            payMethod: Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))
        })

        const { error } = Schema.validate(state)

        if (error) {
            toast.error(error.details[0].message)
        }

        if (!state.sellingMode.retail && !state.sellingMode.wholesale) {
            toast.error("Elegie si vas a vender por menor o por mayor")
        }

        if (!error) {
            console.log("subdio")
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-7 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Añade los datos de tu marca
                </Text>
                <Text weight={600} tag="h4" className="d-flex flex-row">
                    <Icon id="info" className={"mt-01"} />
                    Información:
                </Text>
                <Input
                    type="text"
                    label="Nombre de la marca"
                    placeholder="Escribe aqui"
                    min={2}
                    max={64}
                    onChange={handleBrandName}
                    iconRight={<Icon id="title" />}
                    value={state.brandName}
                    clearable />

                <Text weight={400} tag="h5" className="mt-3">
                    Privacidad:
                </Text>
                <Checkbox
                    label="¿Quiere que su numero de telefono sea publico?"
                    className="mb-3"
                    size={6}
                    onChange={handlePrivacy("phoneVisible")} />

                <SellingMode isRetail={state.sellingMode.retail} isWholesale={state.sellingMode.wholesale} onChange={handleSellingMode} />


                <Text weight={400} tag="h5" className="mt-3">
                    Datos administrativos:
                </Text>
                <div className="d-flex flex-row mb-4">
                    <Select
                        label="Categoria"
                        onChange={handleGenericString("category")}
                        value={state.category}
                        className="">
                        <Select.Option value="">Elige una opción</Select.Option>
                        <Select.Option value="deportivo">Deportivo</Select.Option>
                        <Select.Option value="lenceria">Lenceria</Select.Option>
                    </Select>
                    <Select
                        label="Medio de envio"
                        onChange={handleGenericString("shippingBy")}
                        value={state.shippingBy}
                        className="ms-3">
                        <Select.Option value="">Elige una opción</Select.Option>
                        <Select.Option value="correo">Correo</Select.Option>
                        <Select.Option value="moto">Moto</Select.Option>
                    </Select>
                    <Select
                        label="Metodo de pago"
                        onChange={handleGenericString("payMethod")}
                        value={state.payMethod}
                        className="ms-3">
                        <Select.Option value="">Elige una opción</Select.Option>
                        <Select.Option value="Efectivo">Efectivo</Select.Option>
                        <Select.Option value="MercadoPago">MercadoPago</Select.Option>
                        <Select.Option value="Transferencia">Transferencia</Select.Option>
                    </Select>
                </div>

                <Text weight={600} tag="h4" className="d-flex flex-row">
                    <Icon id="my_location" />
                    Ubicación:
                </Text>
                <SellZone zone={state.location.zone} onClick={handleZone} />
                {
                    state.location.zone == "la salada" &&
                    <SaladaZone state={state.location} onChange={handleLocation} />
                }
                {
                    state.location.zone == "flores" &&
                    <FloresZone state={state.location} onChange={handleLocation} />
                }
                <div className="d-flex justify-content-center">
                    <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center" onClick={submit}>
                        <Text weight="700">
                            Registrar marca
                        </Text>
                        <Icon id="add_business" className="ms-2" />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ClaimPositionModule