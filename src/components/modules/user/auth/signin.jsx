import Icon from "@/ui/icons";
import { useState } from 'react';
import { toast } from 'react-toastify';
import Post from '@/utils/hooks/post'
import Joi from 'joi'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router';
import { Button, Card, Grid, Input, Text } from '@nextui-org/react';
import stringMessages from "@/src/utils/joi/customMessages";
import Link from "@/src/utils/hooks/link";


const SignInModule = () => {
    const [state, setState] = useState({
        email: {
            value: "",
            error: false
        },
        password: {
            value: "",
            error: false
        },
    })
    const router = useRouter()

    const handleInput = (key) => (e) => {
        setState({
            ...state, [key]: {
                error: false,
                value: e.target.value.trim()
            }
        })
    }


    const submit = () => {
        const Schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).messages(stringMessages("Correo electrónico")).required(),
            password: Joi.string().min(6).messages(stringMessages("Contraseña")).required()
        })

        const { error } = Schema.validate({
            email: state.email.value,
            password: state.password.value
        })
        if (error) {
            return setState({
                ...state,
                [error.details[0].path[0]]: {
                    ...state[error.details[0].path[0]],
                    error: error.details[0].message
                }
            })
        }

        if (!error) {
            Post(`/${router?.locale}/user/auth/signin`, {
                email: state.email.value,
                password: state.password.value
            })
                .then(res => {
                    toast(res.data.msg)
                    jsCookie.set("sldtoken", res.data.sldtoken)
                    if (router.query.redirect) {
                        return router.push(`${router.query.redirect}`)
                    }
                    return router.push(`/./${router?.locale}/`)
                })
                .catch(err => {
                    if (err.response) {
                        return toast(err.response.data.msg)
                    }
                    return toast("hubo un error de red al enviar el formulario")
                })
        }

    }

    return (
        <Grid.Container justify="center" css={{ mt: 20, minHeight: '100vh' }}>
            <Grid xs={12} sm={4} md={3} css={{ h: '50%' }}>
                <Card variant="flat" css={{bg:"$white"}}>
                    <Card.Header>
                        <Grid.Container justify="center">
                            <Grid>
                                <Text h3 weight="bold">
                                    Iniciar Sesión en Iwarket
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body>
                        <Input
                            clearable
                            contentLeft={<Icon id="mail" />}
                            type="email"
                            label="Correo electrónico"
                            aria-labelledby="Correo electrónico"
                            placeholder="Escribe aqui tu correo electrónico"
                            helperText={state.email.error}
                            helperColor="error"
                            status={state.email.error ? "error" : "default"}
                            value={state.email.value}
                            onChange={handleInput("email")}
                            css={{ mb: 30 }}
                        />
                        <Input.Password
                            clearable
                            contentLeft={<Icon id="lock" />}
                            label="Contraseña"
                            aria-labelledby="Contraseña"
                            placeholder="Escribe aqui tu contraseña"
                            helperText={state.password.error}
                            helperColor="error"
                            status={state.password.error ? "error" : "default"}
                            value={state.password.value}
                            onChange={handleInput("password")}
                            css={{ mb: 30 }}
                        />
                        <Grid.Container justify="flex-end">
                            <Button css={{ bg: "$primary" }} onPress={submit}>
                                <Text weight="bold" color="$white">
                                    Ingresar
                                </Text>
                                <Icon id="arrow_forward" css={{ color: "$white" }} />
                            </Button>
                        </Grid.Container>
                        <Text>
                            ¿No tienes cuenta? &nbsp;
                            <Link href="/user/auth/signup">
                                Registrarme
                            </Link>
                        </Text>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default SignInModule