import Icon from "@/ui/icons";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';

import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import ShouldHaveBrand from '@/components/modules/user/errors/shouldHaveBrand';
import IsNotOwner from '@/components/modules/user/errors/isNotOwner';
import ShouldBePremiun from '@/components/modules/user/errors/shouldBePremiun'
import HardLimit from '@/components/modules/user/errors/hardLimit'

import { Button, Card, Checkbox, Container, Grid, Input, Loading, Text, Textarea } from "@nextui-org/react";
import Clasification from "./sections/clasification";
import ImagesSection from "./sections/images";
//Validation
import { toast } from "react-toastify";
import Submit from "./sections/submit";
import Get from "@/src/utils/hooks/get";
import jsCookie from 'js-cookie'

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
            retail: { error: "", value: data?.prices.retail || 0 },
            wholesale: { error: "", value: data?.prices.wholesale || 0 },
            perDozen: { error: "", value: data?.prices.perDozen || 0 },
            perCurve: { error: "", value: data?.prices.perCurve || 0 },
            perQuantity: { error: "", value: data?.prices.perQuantity || 0 }
        }
    }

    const [state, setState] = useState(defaultState),
        [isDeleting, setDeleting] = useState(false)

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

    if (user.products == 5 && !user.status.isPremiun && data === undefined) {
        return <ShouldBePremiun />
    }
    if (user.products == 40 && user.status.isPremiun && user.status.premiunPlan == "feriante" && data === undefined) {
        return <ShouldBePremiun />
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
    const handlePrices = key => (e) => {
        setState({
            ...state,
            prices: {
                ...state.prices,
                [key]: {
                    error: "",
                    value: e.target.value
                }
            }
        })
    }

    const deleteProduct = () => {
        setDeleting(true)
        Get(`products/product/${data._id}/delete`, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).then(res => {
            toast(res.data.msg)
            setDeleting(false)
            if (user.isAdmin) {
                return router.push("/./admin/search/products")
            }
            router.push("/./user/products")
        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data);
            }
            toast.error("Ocurrio un error de nuestro lado")
            setDeleting(false)
        })
    }

    return (
        <Container lg>

            <Grid.Container justify="center" css={{ my: 20 }}>
                <Grid xs={12} md={10} >
                    <Grid.Container direction="column">
                        {
                            user.isAdmin && data &&
                            <Card css={{ mb: 10 }}>
                                <Card.Header>
                                    <Text h3>
                                        Datos de la marca
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                    <Text b h4>
                                        Nombre: {data.brand.brandName}
                                    </Text>
                                    <Text b h4>
                                        Ubicación: {data.brand.location.zone}
                                    </Text>
                                    <Text b h4>
                                        Numero: {data.brand.phone}
                                    </Text>
                                    <Text b h4>
                                        Es premiun: {data.brand.isPremiun ? "Si" : "No"}
                                    </Text>
                                </Card.Body>
                            </Card>
                        }
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

                                    {
                                        user.status.isPremiun &&
                                        <Grid>
                                            <Text h3>
                                                Formas de vender
                                            </Text>
                                        </Grid>
                                    }
                                    <Grid>
                                        <Grid.Container gap={1}>
                                            {
                                                user.isWholesaleAndRetail &&
                                                <Grid>
                                                    <Input
                                                        type="number"
                                                        clearable
                                                        label="Precio por menor"
                                                        placeholder="Escribe aqui el precio por menor"
                                                        helperColor="error"
                                                        helperText={state.prices.retail.error}
                                                        status={state.prices.retail.error ? "error" : "default"}
                                                        contentLeft={<Icon id="inventory" />}
                                                        value={state.prices.retail.value}
                                                        onChange={handlePrices("retail")} />
                                                </Grid>
                                            }
                                            <Grid>
                                                <Input
                                                    type="number"
                                                    clearable
                                                    label="Precio por mayor"
                                                    placeholder="Escribe aqui el precio por mayor"
                                                    helperColor="error"
                                                    helperText={state.prices.wholesale.error}
                                                    status={state.prices.wholesale.error ? "error" : "default"}
                                                    contentLeft={<Icon id="inventory" />}
                                                    value={state.prices.wholesale.value}
                                                    onChange={handlePrices("wholesale")} />
                                            </Grid>

                                        </Grid.Container>
                                        {
                                            user.status.isPremiun &&
                                            <Grid.Container gap={1}>
                                                <Grid>
                                                    <Input
                                                        type="number"
                                                        clearable
                                                        label="Precio por docena"
                                                        placeholder="Escribe aqui el precio por docena"
                                                        helperColor="error"
                                                        helperText={state.prices.perDozen.error}
                                                        status={state.prices.perDozen.error ? "error" : "default"}
                                                        contentLeft={<Icon id="inventory" />}
                                                        value={state.prices.perDozen.value}
                                                        onChange={handlePrices("perDozen")} />
                                                </Grid>
                                                <Grid>
                                                    <Input
                                                        type="number"
                                                        clearable
                                                        label="Precio por curva"
                                                        placeholder="Escribe aqui el precio por curva"
                                                        helperColor="error"
                                                        helperText={state.prices.perCurve.error}
                                                        status={state.prices.perCurve.error ? "error" : "default"}
                                                        contentLeft={<Icon id="inventory" />}
                                                        value={state.prices.perCurve.value}
                                                        onChange={handlePrices("perCurve")} />
                                                </Grid>
                                                <Grid>
                                                    <Input
                                                        type="number"
                                                        clearable
                                                        label="Precio por cantidad"
                                                        placeholder="Escribe aqui el precio por cantidad"
                                                        helperColor="error"
                                                        helperText={state.prices.perQuantity.error}
                                                        status={state.prices.perQuantity.error ? "error" : "default"}
                                                        contentLeft={<Icon id="inventory" />}
                                                        value={state.prices.perQuantity.value}
                                                        onChange={handlePrices("perQuantity")} />
                                                </Grid>

                                            </Grid.Container>
                                        }

                                    </Grid>
                                    <Grid>
                                        <ImagesSection state={state} setState={setState} />
                                    </Grid>
                                </Grid.Container>
                                <Grid.Container justify={data ? "space-between" : "flex-end"}>
                                    {
                                        data &&
                                        <Button auto
                                            color="error"
                                            css={{ color: "$white", mt: 10 }}
                                            iconRight={isDeleting ?
                                                <Loading type="points" color="currentColor" size="sm" /> : <Icon id="delete" color="white" />}
                                            disabled={isDeleting}
                                            onPress={deleteProduct}>
                                            Eliminar producto
                                        </Button>
                                    }
                                    <Submit state={state} setState={setState} data={data} resetState={resetState} />
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                        {
                            !data &&
                            <Card css={{ mt: 10 }}>
                                <Card.Header>
                                    <Grid.Container justify="center">
                                        <Text h2>
                                            Plan premiun
                                        </Text>
                                    </Grid.Container>
                                </Card.Header>
                                <Card.Body>
                                    <Text h4>
                                        Venta por Docena:
                                    </Text>
                                    <Text> - Nombre del producto</Text>
                                    <Text> - Categoría del producto</Text>
                                    <Text> - Apartir de cuantas  docenas vendes para hacer envios</Text>
                                    <Text> - Cantidad total o Stock del producto disponible.</Text>
                                    <Text> - Descripción del producto</Text>
                                    <Text> - Precio total por docena:</Text>

                                    <Text h4>
                                        Venta por Cantidad:
                                        CURVA O DOCENA
                                    </Text>
                                    <Text> - Nombre del producto</Text>
                                    <Text> - Categoría del producto</Text>
                                    <Text> - Cantidad total o Stock del producto disponible.</Text>
                                    <Text> - Descripción del producto</Text>
                                    <Text> - Precio por mayor por docena O CURVA:</Text>
                                    <Text> - Apartir de cuantas  docenas O CURVA vendes por cantidad para hacer envios </Text>
                                    <Text> - Precio total por cantidad de docena O CURVA: </Text>

                                    <Text h4>
                                        Venta por Curva:
                                    </Text>
                                    <Text> - Nombre del producto</Text>
                                    <Text> - Categoría del producto</Text>
                                    <Text> - Cantidad total o Stock del producto disponible.</Text>
                                    <Text> - Descripción del producto</Text>
                                    <Text> - Apartir de cuantas  Curvas vendes para hacer envíos</Text>
                                    <Text> - precio total por mayor por curva</Text>

                                    <Text h4>
                                        Venta por Tarea:
                                    </Text>
                                    <Text> - Nombre del producto</Text>
                                    <Text> - Categoría del producto</Text>
                                    <Text> - Cantidad total o Stock del producto disponible.</Text>
                                    <Text> - Descripción del producto</Text>
                                    <Text> - Apartir de cuantas  tareas vendes para hacer envios</Text>

                                    <Button onPress={() => {
                                        window.open("https://api.whatsapp.com/send?text=Hola quiero contratar el plan premiun&phone=541170895828")
                                    }}>
                                        Contactar
                                    </Button>
                                </Card.Body>
                            </Card>
                        }
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </Container>
    )


}

export default ManageProduct