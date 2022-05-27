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
import jsCookie from 'js-cookie'
import {useRouter} from 'next/router';

const Option = ({ value, text, icon, isSelected, onClick }) => (
    <div onClick={() => onClick(value)} className={`d-flex flex-column rounded-16 p-3 pointer mx-2 bg-gray-${isSelected ? "500" : "100"} border ${isSelected ? "border-dark" : ""}`}>
        <Icon id={icon} className="fs-1 text-center" />
        <Text weight={600}>
            {text}
        </Text>
    </div>
)

const SignUpModule = () => {

    const router = useRouter()

    //STATE
    const [state, setState] = useState({
        isSeller: null,
        location: null,
        name: "",
        lastName: "",
        email: "",
        cellPhone: "",
        password: "",
        rePassword: "",
        sellingMode: {
            wholesale: false,
            retail: false,
        },
    }),
        [acceptTermsOfService, setAcceptTermsOfService] = useState(false),
        [isValidRepassword, validateRepassword] = useState(0)

    //HANDLERS
    const handleOption = (key) => (v) => {
        setState({ ...state, [key]: v })
    }

    const handleInput = (key) => (e) => {
        if (key == 'lastName') {
            return setState({ ...state, [key]: e.target.value.replace(/[^\w\s]/g, "") })
        }
        if (key == 'cellPhone') {
            return setState({ ...state, [key]: e.target.value.trim().replace(/[^0-9]/g, "") })
        }
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
        setAcceptTermsOfService(e.target.checked)
    }


    //SUBMIT
    const submit = () => {
        //CHECKING
        const Schema = Joi.object({
            isSeller: Joi.boolean(),
            location: state.isSeller ==true ? Joi.number().min(0).max(2):Joi.string().allow(null) ,
            name:
                Joi
                    .string()
                    .min(3).max(32)
                    .alphanum(),
            lastName:
                Joi
                    .string()
                    .min(3).max(32)
                    .pattern(new RegExp(/^\w+(?:\s+\w+)*$/)),
            email:
                Joi
                    .string()
                    .min(6).max(320)
                    .email({ tlds: { allow: false } }).required(),
            cellPhone:
                Joi
                    .string()
                    .min(8).max(10),
            sellingMode: Joi.object({
                wholesale: Joi.boolean(),
                retail: Joi.boolean()
            }),
            password:
                Joi
                    .string()
                    .min(6).max(2048),
            rePassword: Joi.string().valid(Joi.ref("password"))
        })

        const { error } = Schema.validate(state)

        if (error) {
            toast("Completa todos los campos correctamente")
            console.error(error);
        }
        if (state.isSeller == null) {
            return toast("Elige una opción entre Comprador/a o Vendedor/a")
        }
        if (state.isSeller == true && state.location == null) {
            return toast("Elige donde venderas")
        }
        if (state.password != state.rePassword) {
            return toast("Las contraseñas deben coincidir")
        }
        if (state.isSeller == true && state.sellingMode.retail == false && state.sellingMode.wholesale ==false) {
            return toast("Debes elegir si venderas al por menor, al por mayor o ambas")
        }
        if (!acceptTermsOfService) {
            return toast("Debes aceptar los terminos y condiciones")
        }

        if (!error) {
            Put("user/auth/signup",{
                isSeller:state.isSeller,
                location: state.isSeller == true ? state.location : undefined,
                name: state.name,
                lastName: state.lastName,
                email: state.email,
                cellPhone: state.cellPhone,
                sellingMode: state.isSeller == true ? state.sellingMode : undefined,
                password: state.password
            })
            .then(res=>{
                toast(res.data.msg)
                jsCookie.set("sldtoken",res.data.sldtoken)
                //router.push("/./")
            })
            .catch(err=>{
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                console.error(err);
                return toast("hubo un error de red al enviar el formulario")
            })
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
                            isSelected={state.isSeller == false}
                            value={false}
                            onClick={handleOption("isSeller")} />
                        <Option
                            text="Vendedor/a"
                            icon="store"
                            isSelected={state.isSeller == true}
                            value={true}
                            onClick={handleOption("isSeller")} />
                    </div>

                    {
                        state.isSeller == true &&
                        <>
                            <Text tag="h4">
                                ¿Donde planeas vender?
                            </Text>
                            <div className="d-flex mb-4">
                                <Option
                                    text="La salada"
                                    icon="pin_drop"
                                    isSelected={state.location == 0}
                                    value={0}
                                    onClick={handleOption("location")} />
                                <Option
                                    text="Flores"
                                    icon="pin_drop"
                                    isSelected={state.location == 1}
                                    value={1}
                                    onClick={handleOption("location")} />
                                <Option
                                    text="Online"
                                    icon="language"
                                    isSelected={state.location == 2}
                                    value={2}
                                    onClick={handleOption("location")} />
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
                            value={state.lastName}
                            onChange={handleInput("lastName")}
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
                            type="text"
                            label="Numero de celular"
                            placeholder="Escribe aqui tu celular"
                            className="mb-2"
                            clearable
                            value={state.cellPhone}
                            onChange={handleInput("cellPhone")}
                            min={8}
                            max={10} />
                        <InputPassword
                            label="Contraseña"
                            placeholder="Escribe aqui tu contraseña"
                            className="mb-2"
                            clearable
                            value={state.password}
                            onChange={handlePassword("password")}
                            min={6} />
                        <InputPassword
                            label="Confirmar contraseña"
                            placeholder="Escribe aqui tu contraseña otra vez"
                            className="mb-4"
                            clearable
                            value={state.rePassword}
                            isValid={isValidRepassword}
                            onChange={handlePassword("rePassword")}
                            min={6} />

                    </div>
                    {
                        state.isSeller == true &&
                        <>
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
                        </>
                    }

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
                        checked={acceptTermsOfService}
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