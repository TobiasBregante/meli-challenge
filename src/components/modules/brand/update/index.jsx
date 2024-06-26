import Icon from "@/ui/icons";
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
//Validation
import { toast } from 'react-toastify'
import { Avatar, Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import Clasification from "@/components/modules/user/auth/claimBrand/sections/clasification";
import jsCookie from 'js-cookie'
import Post from "@/src/utils/hooks/post";
import timeago from "@/src/utils/timeago";
import Get from "@/utils/hooks/get";

const UpdateBrandModule = ({ data }) => {
    const router = useRouter()
    const user = useUserContext()
    const [state, setState] = useState({
        brandName: { error: "", value: data.brandName },
        category: { error: "", value: data.category },
        payMethod: { error: "", value: data.payMethod },
    })

    const [isSubmiting, setSubmiting] = useState(false)

    if (!user) {
        return (
            <ShouldLogin />
        )
    }

    const handleBrandName = (e) => {
        setState({
            ...state, brandName: {
                error: "",
                value: e.target.value
            }
        })
    }

    const handleGenericString = (key) => e => {
        setState({
            ...state,
            [key]: {
                error: "",
                value: e.target.value
            }
        })
    }

    //SUBMIT
    const submit = () => {
        setSubmiting(true)

        console.error(error);

        if (state.payMethod.value.length == 0) {
            setSubmiting(false)
            return setState({
                ...state,
                payMethod: {
                    value: [],
                    error: "Elige al menos un metodo de pago"
                }
            })
        }

        if (error) {
            setSubmiting(false)
            if (error.details[0].path.length == 2) {
                return setState({
                    ...state,
                    [error.details[0].path[0]]: {
                        ...state[error.details[0].path[0]],
                        [error.details[0].path[1]]: {
                            value: state[error.details[0].path[0]][error.details[0].path[1]].value,
                            error: error.details[0].message
                        }
                    }
                })
            }

            return setState({
                ...state,
                [error.details[0].path[0]]: {
                    value: state[error.details[0].path[0]].value,
                    error: error.details[0].message
                }
            })
        }

        if (!error) {
            Post(`/${router?.locale}/brands/brand/${data._id}/update`, value, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            }).then(res => {
                toast(res.data.msg)
                return setSubmiting(false)

            }).catch(err => {
                if (err.response.data) {
                    toast.error(err.response.data);
                }
                toast.error("Ocurrio un error de nuestro lado")
                setSubmiting(false)
            })
        }
    }

    const validateFor = (index) => {
        const now = new Date()
        const dates = ["now",
            new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
            new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()),
            new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()),
            new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())]

        Post(`/${router?.locale}/brands/brand/${data._id}/update`, {
            isActiveUntil: dates[index]
        }, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).then(res => {
            toast(res.data.msg)
            return setSubmiting(false)

        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data);
            }
            toast.error("Ocurrio un error de nuestro lado")
            setSubmiting(false)
        })
    }

    const removeBrand = () => {
        setSubmiting(true)
        Get(`/${router?.locale}/brands/brand/${data._id}/delete`, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).then(res => {
            toast(res.data.msg)
            setSubmiting(false)
            router.push(`/./${router?.locale}/`)
        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data);
            }
            toast.error("Ocurrio un error de nuestro lado")
            setSubmiting(false)
        })
    }

    return (
        <Grid.Container justify="center" >
            <Grid xs={12} sm={9} >
                <Grid.Container direction="column">
                    <Card css={{ mb: 10 }}>
                        <Card.Header>
                            <Text h3>
                                Datos del vendedor
                            </Text>
                            <Avatar css={{ marginLeft: '$10' }} squared src={`/img/avatars/1.png`} />
                        </Card.Header>
                        <Card.Body>
                            <Text b h4>
                                Nombre: {data.ownerData.name}
                            </Text>
                            <Text b h4>
                                Email: {data.ownerData.email}
                            </Text>
                            <Text b h4>
                                Numero de celular: {data.ownerData.cellPhone}
                            </Text>
                        </Card.Body>
                    </Card>
                    <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                        <Card.Header>
                            <Grid.Container justify="center">
                                <Grid>
                                    <Text h3 weight="bold">
                                        Actualiza los datos de tu marca
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
                                        helperText={state.brandName.error}
                                        helperColor="error"
                                        status={state.brandName.error ? "error" : "default"}
                                        onChange={handleBrandName}
                                        contentLeft={<Icon id="title" />}
                                        value={state.brandName.value}
                                        css={{ w: "100%" }} />
                                </Grid>
                                <Grid>
                                    <Clasification state={state} onChange={handleGenericString}/>
                                </Grid>
                                {
                                    user?.isAdmin &&
                                    <Fragment>
                                        <Card.Divider />
                                        <Text h3>
                                            Validar por:
                                        </Text>
                                        <Grid.Container>
                                            <Button auto color="error" icon={<Icon id="arrow_downward" color="white" />} onPress={() => validateFor(0)}>
                                                Suspender
                                            </Button>
                                            <Button auto color="success" icon={<Icon id="date_range" />} css={{ color: "$dark", mx: 10 }} onPress={() => validateFor(4)}>
                                                Activar
                                            </Button>
                                        </Grid.Container>
                                        <Text css={{ mt: 20 }}>
                                            Vence: {timeago(data.isActiveUntil) == "justo ahora" ? "Ya vencio" : timeago(data.isActiveUntil)}
                                        </Text>
                                    </Fragment>
                                }
                            </Grid.Container>
                            <Grid.Container justify="space-between">
                                <Button auto
                                    color="error"
                                    css={{ color: "$white", mt: 10 }}
                                    iconRight={isSubmiting ?
                                        <Loading type="points" color="currentColor" size="sm" /> : <Icon id="delete" color="white" />}
                                    disabled={isSubmiting}
                                    onPress={removeBrand}>
                                    Eliminar marca
                                </Button>
                                <Button auto
                                    color="secondary"
                                    css={{ color: "$white", mt: 10 }}
                                    iconRight={<Icon css={{ color: '$white' }} id="arrow_upward" />}
                                    disabled={isSubmiting}
                                    onPress={submit}>
                                    {
                                        isSubmiting &&
                                        <Loading type="points" color="currentColor" size="sm" />
                                    }
                                    Actualizar
                                </Button>
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}

export default UpdateBrandModule