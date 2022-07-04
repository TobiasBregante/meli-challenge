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
import Put from '@/src/utils/hooks/put';
import categories from '@/src/utils/user/brand/categories';

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
                    clearable
                    className="mb-3" />

                <SellingMode isWholesaleAndRetail={state.isWholesaleAndRetail} onChange={handleSellingMode} />


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
                        {
                            categories.map((category, i) => (
                                <Select.Option key={i} value={category}>{category}</Select.Option>
                            ))
                        }
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
                </div>
                <Text weight={400} tag="h5" >
                    Metodos de pago
                </Text>
                <div className="d-flex flex-row mb-4">
                    <Checkbox label="Transferencia" size={6} className="me-2"
                        checked={state.payMethod.some(x => x === "transferencia")}
                        onChange={handlePaymethod("transferencia")} />
                    <Checkbox label="Efectivo" size={6} className="me-2"
                        checked={state.payMethod.some(x => x === "efectivo")}
                        onChange={handlePaymethod("efectivo")} />
                    <Checkbox label="Mercadopago" size={6} className="me-2"
                        checked={state.payMethod.some(x => x === "mercadopago")}
                        onChange={handlePaymethod("mercadopago")} />
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