import Icon from "@/ui/icons";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';

import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import ShouldHaveBrand from '@/components/modules/user/errors/shouldHaveBrand';
import IsNotOwner from '@/components/modules/user/errors/isNotOwner';
import ShouldBePremiun from '@/components/modules/user/errors/shouldBePremiun'

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
import Submit from "./sections/submit";

const ManageProduct = ({ website, data }) => {

    const router = useRouter()
    const user = useUserContext()

    const defaultState = {
        title: { error: "", value: data?.title || "" },
        category: { error: "", value: data?.category || "" },
        stock: { error: "", value: data?.stock || "" },
        description: { error: "", value: data?.description || "" },
        imgs: { error: "", value: data?.imgs || [] },
        prices: {
            retail: {
                isPerUnit: { error: "", value: data?.prices.retail.isPerUnit || true },
                minPerUnit: { error: "", value: data?.prices.retail.minPerUnit || 0 },
                pricePerUnit: { error: "", value: data?.prices.retail.pricePerUnit || 0 },

                minPerDozen: { error: "", value: data?.prices.retail.minPerDozen || 0 },
                pricePerDozen: { error: "", value: data?.prices.retail.pricePerDozen || 0 }
            },
            wholesale: {
                sellMode: { error: "", value: data?.prices.wholesale.sellMode || 0 },

                perUnitTalk: { error: "", value: data?.prices.wholesale.perUnitTalk || false },
                minPerUnit: { error: "", value: data?.prices.wholesale.minPerUnit || 0 },
                pricePerUnit: { error: "", value: data?.prices.wholesale.pricePerUnit || 0 },
                minPerBigUnit: { error: "", value: data?.prices.wholesale.minPerBigUnit || 0 },
                pricePerBigUnit: { error: "", value: data?.prices.wholesale.pricePerBigUnit || 0 },

                perDozenTalk: { error: "", value: data?.prices.wholesale.perDozenTalk || false },
                minPerDozen: { error: "", value: data?.prices.wholesale.minPerDozen || 0 },
                pricePerDozen: { error: "", value: data?.prices.wholesale.pricePerDozen || 0 },
                minPerBigDozen: { error: "", value: data?.prices.wholesale.minPerBigDozen || 0 },
                pricePerBigDozen: { error: "", value: data?.prices.wholesale.pricePerBigDozen || 0 },

                perCurveTalk: { error: "", value: data?.prices.wholesale.perCurveTalk || false },
                sizesPerCurve: { error: "", value: data?.prices.wholesale.sizesPerCurve || 0 },
                minPerCurve: { error: "", value: data?.prices.wholesale.minPerCurve || 0 },
                pricePerCurve: { error: "", value: data?.prices.wholesale.pricePerCurve || 0 },
                minPerBigCurve: { error: "", value: data?.prices.wholesale.minPerBigCurve || 0 },
                pricePerBigCurve: { error: "", value: data?.prices.wholesale.pricePerBigCurve || 0 }
            }
        }
    }

    const [state, setState] = useState(defaultState)

    const resetState = () => {
        if (!data) {
            setState(defaultState)
        }
    }


    if (!user) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isAdmin && !user.isSeller) {
        return (
            <ShouldBeSeller />
        )
    }
    if (!user.isAdmin && user.brand == undefined) {
        return <ShouldHaveBrand />
    }
    if (!user.isAdmin && data?.isOwnedBy != undefined && data?.isOwnedBy != user._id) {
        return <IsNotOwner />
    }

    if (user.products == 5 && !user.status.isPremiun) {
        return <ShouldBePremiun />
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

    return (
        <Container lg>

            <Grid.Container justify="center" css={{ my: 20 }}>
                <Grid xs={12} sm={10} >
                    <Card variant="flat" css={{ bg: "$white", pb: 20 }}>
                        <Card.Header>
                            <Grid.Container justify="center">
                                <Grid>
                                    <Text h3 weight="bold">
                                        {
                                            data !== undefined ?
                                                "Actualizar producto" : "Registra un producto"
                                        }
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
                                        <Clasification state={state} onChange={handleGenericString} website={website} />
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

                                        {
                                            (data?.brand?.isWholesaleAndRetail || user?.brand?.isWholesaleAndRetail) &&
                                            <>
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
                                                    {
                                                        user.status.isPremiun &&
                                                        <Checkbox
                                                            onChange={handleRetailSellMode(false)}
                                                            isSelected={state.prices.retail.isPerUnit.value == false}
                                                            label="Por docena" />
                                                    }
                                                </Grid.Container>
                                                {
                                                    state.prices.retail.isPerUnit.value &&
                                                    <RetailPerUnit state={state.prices.retail} handleState={handleRetail} />
                                                }
                                                {
                                                    state.prices.retail.isPerUnit.value == false &&
                                                    <RetailPerDozen state={state.prices.retail} handleState={handleRetail} />
                                                }
                                            </>
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
                                            {
                                                user.status.isPremiun &&
                                                <>
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
                                                </>
                                            }
                                        </Grid.Container>
                                        {
                                            state.prices.wholesale.sellMode.value == 0 &&
                                            <WholesalePerUnit state={state.prices.wholesale} handleState={handleWholesale} data={data} />
                                        }
                                        {
                                            state.prices.wholesale.sellMode.value == 1 &&
                                            <WholesalePerDozen state={state.prices.wholesale} handleState={handleWholesale} data={data} />
                                        }
                                        {
                                            state.prices.wholesale.sellMode.value == 2 &&
                                            <WholesalePerCurve state={state.prices.wholesale} handleState={handleWholesale} data={data} />
                                        }
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <ImagesSection state={state} setState={setState} />
                                </Grid>
                            </Grid.Container>
                            <Grid.Container justify="center">
                                <Submit state={state} setState={setState} data={data} resetState={resetState} />
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Container>
    )


}

export default ManageProduct