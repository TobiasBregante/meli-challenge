import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import InputPassword from "@/ui/inputs/password"
import Checkbox from "@/ui/inputs/checkbox"
import Button from "@/ui/buttons"
import Link from 'next/link';
import { toast } from 'react-toastify';
import Put from '@/utils/hooks/put'
import Joi from 'joi'

const Option = ({ value, text, icon, isSelected, onClick }) => (
    <div onClick={() => onClick(value)} className={`d-flex flex-column rounded-16 p-3 pointer mx-2 bg-gray-${isSelected ? "500" : "100"} border ${isSelected ? "border-dark":""}`}>
        <Icon id={icon} className="fs-1 text-center" />
        <Text weight={600}>
            {text}
        </Text>
    </div>
)

const SignUpModule = () => {
    const [state, setState] = useState({
        accountType: "",
        sellLocation: "",
        name: "",
        lastname: "",
        email: "",
        cellphone: "",
        password: "",
        rePassword: "",
        sellingMode: {
            retail: false,
            wholesale: false,
        },
        acceptTermsOfService: false
    }),
        [isValidRepassword, validateRepassword] = useState(0)

    const handleOption = (key) => (v) => {
        setState({ ...state, [key]: v })
    }

    const handleInput = (key) => (e) => {
        setState({ ...state, [key]: e.target.value.trim() })
    }

    const handlePassword = (key) => (e) => {
        if (key == "password") {
            if (state.rePassword != e.target.value) {
                if (state.rePassword != "") {
                    validateRepassword(1)
                }
            } else {
                validateRepassword(2)
            }
        }
        if (key == "rePassword") {
            if (state.password != e.target.value) {
                validateRepassword(1)
            } else {
                validateRepassword(2)
            }
        }
        setState({ ...state, [key]: e.target.value })
    }

    const handleCheckboxSellingMode = (key) => (e) => {
        setState({
            ...state, sellingMode: {
                ...state.sellingMode,
                [key]: e.target.checked
            }
        })
    }
    const handleTerms = e => {
        setState({ ...state, acceptTermsOfService: e.target.checked })
    }


    const submit = () => {
        const Schema = Joi.object({
            accountType: Joi.string().valid("comprador", "vendedor").required(),
            sellLocation: Joi.string().valid("salada", "flores", "online", "").required(),
            name: Joi.string().min(3).required(),
            lastname: Joi.string().min(3),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            cellphone: Joi.string().min(8).required(),
            password: Joi.string().required(),
            rePassword: Joi.string().valid(Joi.ref("password")).required(),
            sellingMode: Joi.object({
                retail: Joi.boolean(),
                wholesale: Joi.boolean().required(),
            }),
            acceptTermsOfService: Joi.boolean().valid(true).required(),
        })

        const { error } = Schema.validate(state)
        if (error) {
            toast("Completa todos los campos")
            console.log(error);
        }
        if (state.accountType == "") {
            toast("Elige una opción entre Comprador/a o Vendedor/a")
        }
        if (state.accountType == "vendedor" && state.sellLocation == "") {
            toast("Elige donde venderas")
        }
        if (state.password != state.rePassword) {
            toast("Las contraseñas deben coincidir")
        }
        if (!state.acceptTermsOfService) {
            toast("Debes aceptar los terminos y condiciones")
        }

    }


    return (
        <div className="container d-flex justify-content-center ">
            <Card className="mt-3 col-12 col-lg-6 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Registrate en SaladaApp
                </Text>
                <div className="d-flex flex-column mt-3">
                    <Text tag="h4">
                        ¿Qué te gustaria ser?
                    </Text>
                    <div className="d-flex mb-4">
                        <Option
                            text="Comprador/a"
                            icon="shopping_cart"
                            isSelected={state.accountType == "comprador"}
                            value="comprador"
                            onClick={handleOption("accountType")} />
                        <Option
                            text="Vendedor/a"
                            icon="store"
                            isSelected={state.accountType == "vendedor"}
                            value="vendedor"
                            onClick={handleOption("accountType")} />
                    </div>

                    {
                        state.accountType == "vendedor" &&
                        <>
                            <Text tag="h4">
                                ¿Donde planeas vender?
                            </Text>
                            <div className="d-flex mb-4">
                                <Option
                                    text="La salada"
                                    icon="pin_drop"
                                    isSelected={state.sellLocation == "salada"}
                                    value="salada"
                                    onClick={handleOption("sellLocation")} />
                                <Option
                                    text="Flores"
                                    icon="pin_drop"
                                    isSelected={state.sellLocation == "flores"}
                                    value="flores"
                                    onClick={handleOption("sellLocation")} />
                                <Option
                                    text="Online"
                                    icon="language"
                                    isSelected={state.sellLocation == "online"}
                                    value="online"
                                    onClick={handleOption("sellLocation")} />
                            </div>
                        </>
                    }
                    <Text tag="h4">
                        Tus datos personales
                    </Text>
                    <div className="col-12 col-lg-12">
                        <Input
                            iconRight={<Icon id="person" />}
                            label="Nombre"
                            placeholder="Escribe aqui tu nombre"
                            className="mb-2"
                            clearable
                            value={state.name}
                            onChange={handleInput("name")}
                            min={3} />
                        <Input
                            iconRight={<Icon id="person" />}
                            label="Apellido"
                            placeholder="Escribe aqui tu apellido"
                            className="mb-2"
                            clearable
                            value={state.lastname}
                            onChange={handleInput("lastname")}
                            min={3} />
                        <Input
                            iconRight={<Icon id="mail" />}
                            type="email"
                            label="Email"
                            placeholder="Escribe aqui tu email"
                            className="mb-2"
                            clearable
                            value={state.email}
                            onChange={handleInput("email")}
                            max={128} />
                        <Input
                            iconRight={<Icon id="call" />}
                            type="number"
                            label="Numero de celular"
                            placeholder="Escribe aqui tu celular"
                            className="mb-2"
                            clearable
                            value={state.cellphone}
                            onChange={handleInput("cellphone")}
                            max={9999999999} />
                        <InputPassword
                            label="Contraseña"
                            placeholder="Escribe aqui tu contraseña"
                            className="mb-2"
                            clearable
                            value={state.password}
                            onChange={handlePassword("password")}
                            min={8} />
                        <InputPassword
                            label="Confirmar contraseña"
                            placeholder="Escribe aqui tu contraseña otra vez"
                            className="mb-4"
                            clearable
                            value={state.rePassword}
                            isValid={isValidRepassword}
                            onChange={handlePassword("rePassword")}
                            min={8} />

                    </div>
                    <Text tag="h5">
                        ¿De que manera venderas?
                    </Text>
                    <div className="d-flex mb-4">
                        <Checkbox
                            label="por menor"
                            size={5}
                            className="me-4"
                            checked={state.sellingMode.retail}
                            onChange={handleCheckboxSellingMode("retail")} />

                        <Checkbox
                            label="por mayor"
                            size={5}
                            checked={state.sellingMode.wholesale}
                            onChange={handleCheckboxSellingMode("wholesale")} />
                    </div>

                    <Text tag="h5">
                        Terminos y condiciones
                    </Text>
                    <Checkbox label={
                        <Text>
                            Acepto los&nbsp;
                            <Text
                                tag="a"
                                className="text-decoration-none pointer"
                                href="/./docs/terms"
                                target="_blank">
                                terminos y condiciones
                                <Icon id="open_in_new" />
                            </Text>

                        </Text>
                    }
                        size={5}
                        checked={state.acceptTermsOfService}
                        onChange={handleTerms} />

                    <div className="d-flex justify-content-center mb-4">
                        <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center" onClick={submit}>

                            <Text weight="700">
                                Registrarme
                            </Text>
                            <Icon id="person_add" className="ms-2" />
                        </Button>
                    </div>

                    <Text>
                        ¿Ya tienes cuenta? &nbsp;
                        <Link href="/./user/auth/signin">
                            <Text weight="700" color="primary" className="pointer">
                                Ingresar
                            </Text>
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default SignUpModule