import Icon from "@/ui/icons";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Put from '@/utils/hooks/put'
import Joi from 'joi'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router';
import PersonalData from './sections/personalData';
import { Button, Card, Checkbox, Grid, Text } from '@nextui-org/react';
import stringMessages from "@/src/utils/joi/customMessages";
import arg from 'arg.js'
import axios from "axios";
import Link from "@/src/utils/hooks/link";

const SignUpModule = () => {
    const router = useRouter()

    const [state, setState] = useState({
        isSeller: true,
        //personal data
        name: {
            error: "",
            value: ""
        },
        lastName: {
            error: "",
            value: ""
        },
        email: {
            error: "",
            value: ""
        },
        cellPhone: {
            error: "",
            value: ""
        },
        password: {
            error: "",
            value: ""
        },
        rePassword: {
            error: "",
            value: ""
        }
    })
    const [acceptTermsOfService, setAcceptTermsOfService] = useState(false)

    const submit = () => {
        const Schema = Joi.object({
            isSeller: Joi.boolean(),
            name: Joi.string().min(3).max(32).messages(stringMessages("Nombre")),
            lastName: Joi.string().min(3).max(32).messages(stringMessages("Apellido")),
            email: Joi.string().min(6).max(320).email({ tlds: { allow: false } }).messages(stringMessages("Correo electrónico")),
            cellPhone: Joi.string().min(8).max(14).messages(stringMessages("Numero de celular")),
            password: Joi.string().min(6).max(2048).messages(stringMessages("Contraseña")),
            rePassword: Joi.string().min(6).max(2048).messages(stringMessages("Confirmar contraseña"))
        })

        const { error } = Schema.validate({
            isSeller: true,
            name: state.name.value,
            lastName: state.lastName.value,
            email: state.email.value,
            cellPhone: state.cellPhone.value,
            password: state.password.value,
            rePassword: state.rePassword.value,
        })

        if (error) {
            if (state.isSeller == null) {
                return toast("Elige una opción entre Comprador/a o Vendedor/a")
            }
            return setState({
                ...state,
                [error.details[0].path[0]]: {
                    value: state[error.details[0].path[0]].value,
                    error: error.details[0].message
                }
            })
        }

        if (typeof arg.phone.clean(state.cellPhone.value) !== "string") {
            return setState({
                ...state,
                cellPhone: {
                    ...state.cellPhone,
                    error: "Hay un error con tu numero de telefono"
                }
            })
        }

        if (state.password.value != state.rePassword.value) {
            return setState({
                ...state,
                rePassword: {
                    ...state.rePassword,
                    error: "Las contraseñas deben coincidir"
                }
            })
        }

        if (!acceptTermsOfService) {
            return toast("Debes aceptar los terminos y condiciones")
        }

        if (!error) {
            Put(`/${router?.locale}/user/auth/signup`, {
                isSeller: true,
                name: state.name.value,
                lastName: state.lastName.value,
                email: state.email.value,
                cellPhone: arg.phone.clean(state.cellPhone.value),
                password: state.password.value
            })
                .then(res => {
                    toast(res.data.msg)
                    jsCookie.set("sldtoken", res.data.sldtoken)

                    if (state.isSeller) {
                        return router.push(`/./${router?.locale}/user/claimBrand`)
                    }
                    return router.push(`/./${router?.locale}/`)
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
        <Grid.Container justify="center" css={{ my: 20 }}>
            <Grid xs={12} sm={4} >
                <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                    <Card.Header>
                        <Grid.Container justify="center">
                            <Grid>
                                <Text h3 weight="bold">
                                    Registrate en Iwarket
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body>
                        <Grid.Container direction="column" css={{ px: "$10" }}>
                            <PersonalData
                                state={state}
                                setState={setState} />
                            <Text h5>
                                Terminos y condiciones
                            </Text>
                            <Checkbox label={
                                <Text>
                                    Acepto los términos y condiciones

                                </Text>
                            }
                                isSelected={acceptTermsOfService}
                                onChange={setAcceptTermsOfService} />
                            <Grid.Container justify="center">
                                <Button color="primary"
                                    css={{ fontWeight: "$bold", color: "$white", mt: "$10" }}
                                    onPress={submit}>
                                    {state?.isSeller == true ? "Siguiente paso" : "Registrarme"}
                                    <Icon css={{ color: "$white" }} id={state?.isSeller == true ? "arrow_forward" : "person_add"} />
                                </Button>
                            </Grid.Container>
                        </Grid.Container>
                    </Card.Body>
                    <Card.Footer>
                        <Text>
                            ¿Ya tienes cuenta? &nbsp;
                            <Link href="/user/auth/signin">
                                Inicia sesión
                            </Link>
                        </Text>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default SignUpModule