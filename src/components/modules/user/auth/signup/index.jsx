import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Checkbox from "@/ui/inputs/checkbox"
import Button from "@/ui/buttons"
import Link from 'next/link';
import { toast } from 'react-toastify';
import Put from '@/utils/hooks/put'
import Joi from 'joi'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router';
import AccountType from '@/components/modules/user/auth/signup/sections/accountType';
import PersonalData from './sections/personalData';

const SignUpModule = () => {

    const router = useRouter()

    //STATE
    const [state, setState] = useState({
        isSeller: null,
        //personal data
        name: "",
        lastName: "",
        email: "",
        cellPhone: "",
        password: "",
        rePassword: ""
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
    

    const handleTerms =  e => {
        setAcceptTermsOfService(e.target.checked)
    }


    //SUBMIT
    const submit = () => {
        //CHECKING
        const Schema = Joi.object({
            isSeller: Joi.boolean(),
            name: Joi.string().min(3).max(32).alphanum(),
            lastName: Joi.string().min(3).max(32).pattern(new RegExp(/^\w+(?:\s+\w+)*$/)),
            email: Joi.string().min(6).max(320).email({ tlds: { allow: false } }).required(),
            cellPhone: Joi.string().min(8).max(10),
            password: Joi.string().min(6).max(2048),
            rePassword: Joi.string().valid(Joi.ref("password"))
        })

        const { error } = Schema.validate(state)

        if (error) {
            toast("Completa todos los campos correctamente")
            return console.error(error);
        }
        if (state.isSeller == null) {
            return toast("Elige una opción entre Comprador/a o Vendedor/a")
        }
        if (state.password != state.rePassword) {
            return toast("Las contraseñas deben coincidir")
        }
        if (!acceptTermsOfService) {
            return toast("Debes aceptar los terminos y condiciones")
        }

        if (!error) {
            Put("user/auth/signup", {
                isSeller: state.isSeller,
                name: state.name,
                lastName: state.lastName,
                email: state.email,
                cellPhone: state.cellPhone,
                password: state.password
            })
                .then(res => {
                    toast(res.data.msg)
                    jsCookie.set("sldtoken", res.data.sldtoken)

                    if (state.isSeller) {
                        return router.push('/./user/claimBrand')
                    }
                    return router.push(`/.`)
                })
                .catch(err => {
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
                    <AccountType state={state} onClick={handleOption("isSeller")} />

                    <PersonalData
                        state={state}
                        handleInput={handleInput}
                        handlePassword={handlePassword}
                        isValidRepassword={isValidRepassword} />

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
                                {state.isSeller? "Siguiente paso":"Registrarme"}
                            </Text>
                            <Icon id={state.isSeller? "arrow_forward":"person_add"} className="ms-2" />
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