import Icon from "@/ui/icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import CantRegisterBrand from '@/components/modules/user/errors/cantRegisterBrand'
//Validation
import { stringMessages } from '@/utils/joi/customMessages'
import Joi from 'joi';
import { toast } from 'react-toastify'
import Put from '@/src/utils/hooks/put';
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react";
import Clasification from "./sections/clasification";
import jsCookie from 'js-cookie'
import Post from "@/src/utils/hooks/post";

const ClaimPositionModule = () => {
    const router = useRouter()
    const user = useUserContext()
    const [state, setState] = useState({
        brandName: { error: "", value: "" },
        category: { error: "", value: "" },
        payMethod: { error: "", value: [] },
    })
    const [isSubmiting, setSubmiting] = useState(false)

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

    if (user.brand != undefined) {
        return <CantRegisterBrand />
    }


    //SUBMIT
    const submit = () => {

        setSubmiting(true)

        //CHECKING
        const Schema = Joi.object({
            brandName: Joi.string().min(3).max(32).messages(stringMessages("Nombre de marca")),
            category: Joi.string().min(1).max(128).messages(stringMessages("Categoria")),
            payMethod: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Metodo de pago"))),
        })

        const { error, value } = Schema.validate({
            brandName: state.brandName.value,
            category: state.category.value,
            payMethod: state.payMethod.value,
        })
        let createData = value

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
            console.error(error);
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

        if (createData && !error) {

            Put(`/${router?.locale}/user/auth/claimbrand`, createData, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            }).then(res => {
                toast(res.data.msg)
                setSubmiting(false)

                router.push(`/./${router?.locale}/user/products/add`)

            }).catch(err => {
                if (err.response.data) {
                    toast.error(err.response.data);
                }
                toast.error("Ocurrio un error de nuestro lado")
                setSubmiting(false)
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
                                    Añade los datos de tu marca
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
                                <Clasification state={state} onChange={handleGenericString} />
                            </Grid>
                        </Grid.Container>
                        <Grid.Container justify="center">
                            <Button auto
                                color="secondary"
                                css={{ color: "$dark" }}
                                iconRight={<Icon id="add_business" />}
                                disabled={isSubmiting}
                                onPress={submit}>
                                {
                                    isSubmiting &&
                                    <Loading type="points" color="currentColor" size="sm" />
                                }
                                Registrar marca
                            </Button>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )

}

export default ClaimPositionModule