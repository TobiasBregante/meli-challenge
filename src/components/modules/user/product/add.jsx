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
import { Button, Card, Checkbox, Grid, Input, Text, Textarea } from "@nextui-org/react";
import Clasification from "./sections/clasification";
import ImagesSection from "./sections/images";
//Validation

const AddProduct = () => {

    const router = useRouter()
    const user = useUserContext()



    const [state, setState] = useState({
        title: {error:"",value:""},
        category: {error:"",value:""},
        stock: {error:"",value:""},
        description: {error:"",value:""},
        imgs: {error:"",value:[]},
        prices: {
            retail: {
                isPerUnit: {error:"",value:null},
                minPerUnit: {error:"",value:""},
                pricePerUnit: {error:"",value:""},

                minPerDozen: {error:"",value:""},
                pricePerDozen: {error:"",value:""}
            },
            wholesale: {
                sellMode: {error:"",value:null},

                minPerUnit: {error:"",value:""},
                pricePerUnit: {error:"",value:""},
                minPerBigUnit: {error:"",value:""},
                pricePerBigUnit: {error:"",value:""},

                minPerDozen: {error:"",value:""},
                pricePerDozen: {error:"",value:""},
                minPerBigDozen: {error:"",value:""},
                pricePerBigDozen: {error:"",value:""},

                sizesPerCurve: {error:"",value:""},
                minPerCurve: {error:"",value:""},
                pricePerCurve: {error:"",value:""},
                minPerBigCurve: {error:"",value:""},
                pricePerBigCurve: {error:"",value:""},
            }
        }
    }),
    [isSubmiting,setSubmiting] = useState(false)

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
                        error:"",
                        value:v
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
                        error:"",
                        value:e.target.value
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

        //CHECKING
        const Schema = Joi.object({
            title: Joi.string().min(2).max(64).messages(stringMessages("Nombre de marca")),
            category: Joi.string().min(2).max(64).messages(stringMessages("Categoria")),
            stock: Joi.number().min(0).max(999999).messages(stringMessages("Stock")),
            description: Joi.string().min(2).max(5000).messages(stringMessages("Descripción")),
            imgs: Joi.array().items(Joi.string().min(1).max(128).messages(stringMessages("Imagenes"))),
            prices: Joi.object({
                retail: {
                    isPerUnit: Joi.boolean().valid(null, true, false).messages(booleanMessages("Por menor")),
                    minPerUnit: Joi.number().min(0).max(999999),
                    
                }  
            })
        })

        const { error, value } = Schema.validate({
            brandName: state.brandName.value,
            isWholesaleAndRetail: state.isWholesaleAndRetail,
            category: state.category.value,
            shippingBy: state.shippingBy.value,
            payMethod: state.payMethod.value,
            location: {
                zone: state.location.zone.value,
                shed: state.location.shed.value,
                stallNumber: state.location.stallNumber.value,
                hallwayNumber: state.location.hallwayNumber.value,
                rowNumber: state.location.rowNumber.value,
                isInGallery: state.location.isInGallery,
                galleryName: state.location.galleryName.value,
                positionInGallery: state.location.positionInGallery.value,
                street: state.location.street.value,
                streetNumber: state.location.streetNumber.value,
            }
        })


        if (state.isWholesaleAndRetail == null) {
            setSubmiting(false)
            toast.error("Elige si vas a vender por menor o por mayor")
        }
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
            if (error.details[0].path.length == 2 ) {
                return setState({
                    ...state,
                    [error.details[0].path[0]]: {
                        ...state[error.details[0].path[0]],
                        [error.details[0].path[1]]:{
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

        if (isInLaSalada && state.location.shed.value == "") {
            setSubmiting(false)
            return toast.error("Elige en que galpon planeas vender")
        }

        if (!error) {
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
        <Grid.Container justify="center" css={{ my: 20 }}>
            <Grid xs={12} sm={4} >
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

                                    <Grid.Container>
                                        <Checkbox
                                            onChange={handleWholesaleSellMode(0)}
                                            isSelected={state.prices.wholesale.sellMode.value == 0}
                                            label="Por unidad"
                                            css={{ mr: 15 }} />
                                        <Checkbox
                                            onChange={handleWholesaleSellMode(1)}
                                            isSelected={state.prices.wholesale.sellMode.value == 1}
                                            label="Por docena"
                                            css={{ mr: 15 }} />
                                        <Checkbox
                                            onChange={handleWholesaleSellMode(2)}
                                            isSelected={state.prices.wholesale.sellMode.value == 2}
                                            label="Por curva" />
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
                            css={{color:"$dark"}} 
                            iconRight={<Icon id="add"/>}
                            onPress={submit}>
                                Añadir producto
                            </Button>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )

    
}

export default AddProduct