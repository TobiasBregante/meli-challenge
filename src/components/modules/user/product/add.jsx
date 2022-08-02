import Icon from "@/ui/icons";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import RetailPerUnit from './sections/retailPerUnit';
import RetailPerDozen from './sections/retailPerDozen';
import WholesalePerUnit from './sections/wholesalePerUnit';
import WholesalePerDozen from './sections/wholesalePerDozen';
import WholesalePerCurve from './sections/wholesalePerCurve';
import { Button, Card, Checkbox, Container, Grid, Input, Text, Textarea } from "@nextui-org/react";
import Clasification from "./sections/clasification";
import ImagesSection from "./sections/images";
//Validation
import Joi from "joi";
import { stringMessages, booleanMessages, numberMessages } from "@/src/utils/joi/customMessages";
import { toast } from "react-toastify";

const AddProduct = () => {

    const router = useRouter()
    const user = useUserContext()



    const [state, setState] = useState({
        title: { error: "", value: "" },
        category: { error: "", value: "" },
        stock: { error: "", value: "" },
        description: { error: "", value: "" },
        imgs: { error: "", value: [] },
        prices: {
            retail: {
                isPerUnit: { error: "", value: null },
                minPerUnit: { error: "", value: 0 },
                pricePerUnit: { error: "", value: 0 },

                minPerDozen: { error: "", value: 0 },
                pricePerDozen: { error: "", value: 0 }
            },
            wholesale: {
                sellMode: { error: "", value: null },

                minPerUnit: { error: "", value: 0 },
                pricePerUnit: { error: "", value: 0 },
                minPerBigUnit: { error: "", value: 0 },
                pricePerBigUnit: { error: "", value: 0 },

                minPerDozen: { error: "", value: 0 },
                pricePerDozen: { error: "", value: 0 },
                minPerBigDozen: { error: "", value: 0 },
                pricePerBigDozen: { error: "", value: 0 },

                sizesPerCurve: { error: "", value: 0 },
                minPerCurve: { error: "", value: 0 },
                pricePerCurve: { error: "", value: 0 },
                minPerBigCurve: { error: "", value: 0 },
                pricePerBigCurve: { error: "", value: 0 },
            }
        }
    }),
        [isSubmiting, setSubmiting] = useState(false)

    if (!user && false) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isSeller && false) {
        return (
            <ShouldBeSeller />
        )
    }

    const handleRetailSellMode = v => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                retail: {
                    ...state.prices.retail,
                    isPerUnit: {
                        error: "",
                        value: v
                    }
                }
            }
        })
    }

    const handleRetail = key => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                retail: {
                    ...state.prices.retail,
                    [key]: {
                        error: "",
                        value: e.target.value
                    }
                }
            }
        })
    }

    const handleWholesaleSellMode = v => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                wholesale: {
                    ...state.prices.wholesale,
                    sellMode: {
                        error: "",
                        value: v
                    }
                }
            }
        })
    }

    const handleWholesale = key => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                wholesale: {
                    ...state.prices.wholesale,
                    [key]: {
                        error: "",
                        value: e.target.value
                    }
                }
            }
        })
    }

    const handleGenericString = key => (e) => {
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

        const retailPerUnit = state.prices.retail.isPerUnit.value

        const wholesaleSellMode = v => (state.prices.wholesale.sellMode.value == v)

        const pricePerBigCurve = () => {
            if (Number(state.prices.wholesale.pricePerCurve.value) != NaN) {
                return Number(state.prices.wholesale.pricePerCurve.value, 10) - 1
            }
            return 1
        }

        const pricePerBigDozen = () => {
            if (Number(state.prices.wholesale.pricePerDozen.value) != NaN) {
                return Number(state.prices.wholesale.pricePerDozen.value) - 1
            }
            return 1
        }

        //Pre check-in
        if (retailPerUnit == null) {
            return toast("Elige una opción para venta por menor")
        }

        if (wholesaleSellMode(null)) {
            return toast("Elige una opción para venta por mayor")
        }



        //CHECKING
        const Schema = Joi.object({
            title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de producto")),
            category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
            description: Joi.string().min(32).max(5000).messages(stringMessages("Descripción")),
            stock: Joi.number().min(0).max(999999).messages(numberMessages("Stock")),

            prices: Joi.object({
                retail: {
                    isPerUnit: Joi.boolean().valid(null, true, false).messages(booleanMessages("Por menor")),
                    minPerUnit: Joi.number().min(retailPerUnit ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima")),
                    pricePerUnit: Joi.number().min(retailPerUnit ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad")),

                    minPerDozen: Joi.number().min(retailPerUnit ? 0 : 1).max(999999).messages(numberMessages("Cantidad minima de docenas por menor")),
                    pricePerDozen: Joi.number().min(retailPerUnit ? 0 : 1).max(999999).messages(numberMessages("Precio por unidad en la docena"))
                },
                wholesale: {
                    sellMode: Joi.number().min(0).max(2).messages(numberMessages("Modo de vender")),
                    minPerUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(stringMessages("Cantidad minima")),
                    pricePerUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad")),
                    minPerBigUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de unidades en gran cantidad")),
                    pricePerBigUnit: Joi.number().min(wholesaleSellMode(0) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en venta de gran cantidad")),

                    minPerDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de docenas")),
                    pricePerDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en cada docena")),
                    minPerBigDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de docenas para gran cantidad")),
                    pricePerBigDozen: Joi.number().min(wholesaleSellMode(1) ? 1 : 0).max(pricePerBigDozen()).messages(numberMessages("Precio por unidad en docenas de gran cantidad")),

                    sizesPerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Talles por curva")),
                    minPerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Cantidad de curvas")),
                    pricePerCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Precio por unidad en la curva")),
                    minPerBigCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(999999).messages(numberMessages("Cantidad minima de curvas para gran cantidad")),
                    pricePerBigCurve: Joi.number().min(wholesaleSellMode(2) ? 1 : 0).max(pricePerBigCurve()).messages(numberMessages("Precio por unidad para ventas en gran cantidad de curvas"))
                }
            }),
            imgs: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Imagenes"))),
        })

        const { error, value } = Schema.validate({
            title: state.title.value,
            category: state.category.value,
            description: state.description.value,
            stock: state.stock.value,
            imgs: state.imgs.value,
            prices: {
                retail: {
                    isPerUnit: state.prices.retail.isPerUnit.value,
                    minPerUnit: state.prices.retail.minPerUnit.value,
                    pricePerUnit: state.prices.retail.pricePerUnit.value,

                    minPerDozen: state.prices.retail.minPerDozen.value,
                    pricePerDozen: state.prices.retail.pricePerDozen.value
                },
                wholesale: {
                    sellMode: state.prices.wholesale.sellMode.value,

                    minPerUnit: state.prices.wholesale.minPerUnit.value,
                    pricePerUnit: state.prices.wholesale.pricePerUnit.value,
                    minPerBigUnit: state.prices.wholesale.minPerBigUnit.value,
                    pricePerBigUnit: state.prices.wholesale.pricePerBigUnit.value,

                    minPerDozen: state.prices.wholesale.minPerDozen.value,
                    pricePerDozen: state.prices.wholesale.pricePerDozen.value,
                    minPerBigDozen: state.prices.wholesale.minPerBigDozen.value,
                    pricePerBigDozen: state.prices.wholesale.pricePerBigDozen.value,

                    sizesPerCurve: state.prices.wholesale.sizesPerCurve.value,
                    minPerCurve: state.prices.wholesale.minPerCurve.value,
                    pricePerCurve: state.prices.wholesale.pricePerCurve.value,
                    minPerBigCurve: state.prices.wholesale.minPerBigCurve.value,
                    pricePerBigCurve: state.prices.wholesale.pricePerBigCurve.value
                }
            }
        })


        if (error) {
            setSubmiting(false)
            //Find sub low level error path
            if (error.details[0].path.length == 3) {
                return setState({
                    ...state,
                    //High level like "title"
                    [error.details[0].path[0]]: {
                        ...state[error.details[0].path[0]],
                        //second level like "retail"
                        [error.details[0].path[1]]: {
                            ...state[error.details[0].path[0]][error.details[0].path[1]],
                            //third level like "isPerUnit"
                            [error.details[0].path[2]]: {
                                value: state[error.details[0].path[0]][error.details[0].path[1]][error.details[0].path[2]].value,
                                error: error.details[0].message
                            }
                        }
                    }
                })
            }
            //Find sub level error path
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

        if (state.imgs.value.length === 0) {
            return toast("Añade al menos una imagen")
        }


        if (!error && false) {
            Put("user/auth/claimbrand", value).then(res => {
                toast(res.data.msg)
                setSubmiting(false)
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
        <Container lg>

            <Grid.Container justify="center" css={{ my: 20 }}>
                <Grid xs={12} sm={6} md={6} lg={6} >
                    <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                        <Card.Header>
                            <Grid.Container justify="center">
                                <Grid>
                                    <Text h3 weight="bold">
                                        Registra un producto
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body>
                            <Grid.Container direction="column" gap={1.5}>
                                <Grid>
                                    <Grid.Container>
                                        <Icon id="info" />
                                        <Text h4>
                                            Información:
                                        </Text>
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <Grid.Container>
                                        <Input
                                            clearable
                                            label="Titulo del producto"
                                            placeholder="Escribe aqui el titulo"
                                            helperColor="error"
                                            helperText={state.title.error}
                                            status={state.title.error ? "error" : "default"}
                                            contentLeft={<Icon id="title" />}
                                            value={state.title.value}
                                            onChange={handleGenericString("title")} />
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <Grid.Container>
                                        <Clasification state={state} onChange={handleGenericString} />
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <Grid.Container>
                                        <Textarea
                                            width="100%"
                                            label="Descripción"
                                            placeholder="Escribe aqui lo mas detalladamente posible tu producto"
                                            helperColor="error"
                                            helperText={state.description.error}
                                            status={state.description.error ? "error" : "default"}
                                            value={state.description.value}
                                            onChange={handleGenericString("description")} />
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <Grid.Container>
                                        <Input
                                            type="number"
                                            clearable
                                            label="Cantidad disponible (stock)"
                                            placeholder="Escribe aqui el stock"
                                            helperColor="error"
                                            helperText={state.stock.error}
                                            status={state.stock.error ? "error" : "default"}
                                            contentLeft={<Icon id="inventory" />}
                                            value={state.stock.value}
                                            onChange={handleGenericString("stock")} />
                                    </Grid.Container>
                                </Grid>

                                <Grid>
                                    <Text h3>
                                        Formas de vender
                                    </Text>
                                </Grid>
                                <Grid>
                                    <Grid.Container>
                                        <Icon id="attach_money" className={"mt-01"} />
                                        <Text h4>
                                            Por menor:
                                        </Text>
                                        <Grid.Container>
                                            <Checkbox
                                                onChange={handleRetailSellMode(true)}
                                                isSelected={state.prices.retail.isPerUnit.value == true}
                                                label="Por unidad"
                                                css={{ mr: 15 }} />
                                            <Checkbox
                                                onChange={handleRetailSellMode(false)}
                                                isSelected={state.prices.retail.isPerUnit.value == false}
                                                label="Por docena" />
                                        </Grid.Container>
                                        {
                                            state.prices.retail.isPerUnit.value &&
                                            <RetailPerUnit state={state.prices.retail} handleState={handleRetail} />
                                        }
                                        {
                                            state.prices.retail.isPerUnit.value == false &&
                                            <RetailPerDozen state={state.prices.retail} handleState={handleRetail} />
                                        }
                                        <Icon id="attach_money" className={"mt-01"} />
                                        <Text h4>
                                            Por mayor:
                                        </Text>

                                        <Grid.Container direction="row" >
                                            <Grid>
                                                <Checkbox
                                                    onChange={handleWholesaleSellMode(0)}
                                                    isSelected={state.prices.wholesale.sellMode.value == 0}
                                                    label="Por unidad"
                                                    css={{ mr: 15 }} />
                                            </Grid>
                                            <Grid>
                                                <Checkbox
                                                    onChange={handleWholesaleSellMode(1)}
                                                    isSelected={state.prices.wholesale.sellMode.value == 1}
                                                    label="Por docena"
                                                    css={{ mr: 15 }} />
                                            </Grid>
                                            <Grid>
                                                <Checkbox
                                                    onChange={handleWholesaleSellMode(2)}
                                                    isSelected={state.prices.wholesale.sellMode.value == 2}
                                                    label="Por curva" />
                                            </Grid>
                                        </Grid.Container>
                                        {
                                            state.prices.wholesale.sellMode.value == 0 &&
                                            <WholesalePerUnit state={state.prices.wholesale} handleState={handleWholesale} />
                                        }
                                        {
                                            state.prices.wholesale.sellMode.value == 1 &&
                                            <WholesalePerDozen state={state.prices.wholesale} handleState={handleWholesale} />
                                        }
                                        {
                                            state.prices.wholesale.sellMode.value == 2 &&
                                            <WholesalePerCurve state={state.prices.wholesale} handleState={handleWholesale} />
                                        }
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <ImagesSection state={state} setState={setState} />
                                </Grid>
                            </Grid.Container>
                            <Grid.Container justify="center">
                                <Button
                                    auto
                                    color="secondary"
                                    css={{ color: "$dark" }}
                                    iconRight={<Icon id="add" />}
                                    onPress={submit}>
                                    Añadir producto
                                </Button>
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Container>
    )


}

export default AddProduct