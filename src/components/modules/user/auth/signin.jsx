import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import InputPassword from "@/ui/inputs/password"
import Button from "@/ui/buttons"
import Link from 'next/link';
import { toast } from 'react-toastify';
import Post from '@/utils/hooks/post'
import Joi from 'joi'
import jsCookie from 'js-cookie'
import {useRouter} from 'next/router';

const SignInModule = () => {

    const router = useRouter()

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const handleInput = (key) => (e) => {
        setState({ ...state, [key]: e.target.value.trim() })
    }


    const submit = () => {
        const Schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(6).required()
        })

        const { error } = Schema.validate(state)
        if (error) {
            console.error(error);
            return toast("Completa todos los campos")
        }

        if (!error) {
            Post("user/auth/signin", {
                email: state.email,
                password: state.password
            })
                .then(res => {
                    toast(res.data.msg)
                    jsCookie.set("sldtoken", res.data.sldtoken)
                    if(router.query.redirect){
                        return router.push(`/.${router.query.redirect}`)
                    }
                    return router.push(`/./`)
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
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-5 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Iniciar Sesión en SaladaApp
                </Text>
                <div className="d-flex flex-column mt-3">
                    <div className="col-12 col-lg-12">
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
                        <InputPassword
                            label="Contraseña"
                            placeholder="Escribe aqui tu contraseña"
                            className="mb-2"
                            clearable
                            value={state.password}
                            onChange={handleInput("password")}
                            min={6} />

                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center" onClick={submit}>

                            <Text weight="700">
                                Ingresar
                            </Text>
                            <Icon id="arrow_forward" className="ms-2" />
                        </Button>
                    </div>

                    <Text>
                        ¿No tienes cuenta? &nbsp;
                        <Link href="/./user/auth/signup">
                            <Text weight="700" color="primary" className="pointer">
                                Registrarme
                            </Text>
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default SignInModule