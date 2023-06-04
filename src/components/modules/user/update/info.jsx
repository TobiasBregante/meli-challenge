import Icon from "@/ui/icons";
import { useState } from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi'
import jsCookie from 'js-cookie'

import { Button, Card, Checkbox, Grid, Input, Text } from '@nextui-org/react';
import stringMessages from "@/src/utils/joi/customMessages";
import Post from "@/src/utils/hooks/post";
import OptionGroup from "../auth/signup/assets/optionGroup";
import UpdatePremiunPlan from "./premiun";
import timeago from "@/src/utils/timeago";

const UpdateUserInfoModule = ({ data }) => {

    const [state, setState] = useState({
        isSeller: data.isSeller,
        //personal data
        name: {
            error: "",
            value: data.name
        },
        lastName: {
            error: "",
            value: data.lastName
        },
        email: {
            error: "",
            value: data.email
        },
        cellPhone: {
            error: "",
            value: data.cellPhone
        }
    })
    const handleOption = (key) => (v) => {
        setState({ ...state, [key]: v })
    }

    const submit = () => {
        const Schema = Joi.object({
            isSeller: Joi.boolean(),
            name: Joi.string().min(3).max(32).messages(stringMessages("Nombre")),
            lastName: Joi.string().min(3).max(32).messages(stringMessages("Apellido")),
            email: Joi.string().min(6).max(320).email({ tlds: { allow: false } }).messages(stringMessages("Correo electrónico")),
            cellPhone: Joi.string().min(8).max(10).messages(stringMessages("Numero de celular"))
        })

        const { error } = Schema.validate({
            isSeller: state.isSeller,
            name: state.name.value,
            lastName: state.lastName.value,
            email: state.email.value,
            cellPhone: state.cellPhone.value
        })

        if (!error) {
            Post(`user/${data._id}`, {
                isSeller: state.isSeller,
                name: state.name.value,
                lastName: state.lastName.value,
                email: state.email.value,
                cellPhone: state.cellPhone.value,
            }, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            })
                .then(res => {

                    return toast(res.data.msg)
                })
                .catch(err => {
                    if (err.response) {
                        return toast(err.response.data.msg)
                    }
                    console.error(err);
                    return toast("hubo un error de red al enviar el formulario")
                })
        } else {
            console.error(error)
            toast('Hubo un error al ingresar los datos')
        }
    }

    const handleInput = (key) => (e) => {
        setState({
            ...state,
            [key]: {
                error: "",
                value: e.target.value
            }
        })
    }

    return (
        <Grid.Container justify="center" >
            <Grid xs={12} sm={8} >
                <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                    <Card.Header>
                        <Grid.Container justify="center">
                            <Grid>
                                <Text h3 weight="bold">
                                    Actualiza los datos de {data.name}
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body>
                        <Grid.Container direction="column" css={{ px: "$10" }}>

                            {/* <Text h3 weight="normal">
                                ¿Qué tipo de cuenta será?
                            </Text>
                            <Grid.Container gap={2}>
                                <Grid>
                                    <OptionGroup
                                        text="Comprador/a"
                                        icon="shopping_cart"
                                        isSelected={state.isSeller == false}
                                        value={false}
                                        onClick={handleOption("isSeller")} />
                                </Grid>
                                <Grid>
                                    <OptionGroup
                                        text="Vendedor/a"
                                        icon="store"
                                        isSelected={state.isSeller == true}
                                        value={true}
                                        onClick={handleOption("isSeller")} />
                                </Grid>
                            </Grid.Container> */}


                            <Text tag="h4" weight={700}>
                                Tus datos personales
                            </Text>
                            <Grid.Container direction="column">
                                <Input
                                    clearable
                                    contentLeft={<Icon id="person" />}
                                    label="Nombre - Escribe tu nombre real, no el de tu marca"
                                    placeholder="Escribe aqui tu nombre" value={state.name.value}
                                    onChange={handleInput("name")}
                                    helperText={state.name.error}
                                    helperColor="error"
                                    status={state.name.error ? "error" : "default"}
                                    css={{ mb: 20 }}
                                    min={3} />
                                <Input
                                    clearable
                                    contentLeft={<Icon id="person" />}
                                    label="Apellido"
                                    placeholder="Escribe aqui tu apellido"
                                    value={state.lastName.value}
                                    onChange={handleInput("lastName")}
                                    helperText={state.lastName.error}
                                    helperColor="error"
                                    status={state.lastName.error ? "error" : "default"}
                                    css={{ mb: 20 }}
                                    min={3} />
                                <Input
                                    clearable
                                    contentLeft={<Icon id="mail" />}
                                    type="email"
                                    label="Correo electrónico"
                                    placeholder="Escribe aqui tu email"
                                    value={state.email.value}
                                    onChange={handleInput("email")}
                                    helperText={state.email.error}
                                    helperColor="error"
                                    status={state.email.error ? "error" : "default"}
                                    css={{ mb: 20 }}
                                    max={128} />
                                <Input
                                    clearable
                                    contentLeft={<Icon id="call" />}
                                    type="text"
                                    label="Numero de celular"
                                    placeholder="Escribe aqui tu celular"
                                    value={state.cellPhone.value}
                                    onChange={handleInput("cellPhone")}
                                    helperText={state.cellPhone.error}
                                    helperColor="error"
                                    status={state.cellPhone.error ? "error" : "default"}
                                    css={{ mb: 20 }}
                                    min={8}
                                    max={14} />

                            </Grid.Container>


                            <Grid.Container justify="center">
                                <Button color="secondary"
                                    css={{ fontWeight: "$bold", color: "$white", mt: "$10" }}
                                    onPress={submit}>
                                    Actualizar
                                    <Icon css={{ color: "$white" }} id="edit" />
                                </Button>
                            </Grid.Container>

                            <Text h2>
                                Administrar premiun
                            </Text>

                            <Grid.Container>
                                <Button auto color={data.status.isPremiun ? "success" : "error"} css={{ mr: 10 }}>
                                    {data.status.isPremiun ? "Es premiun" : "No es premiun"}
                                </Button>
                                <Button auto color="gray">
                                    {data.status.isPremiunUntil ? `Vence: ${timeago(data.status.isPremiunUntil)}` : "Aun no fue premiun"}
                                </Button>
                                {
                                    data.status.premiunPlan &&
                                    <Button auto color="success" css={{ ml: 10 }}>
                                        Plan: {data.status.premiunPlan}
                                    </Button>
                                }
                            </Grid.Container>

                            <UpdatePremiunPlan data={data} />
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default UpdateUserInfoModule