import Icon from "@/src/components/ui/icons"
import { Grid, Text } from "@nextui-org/react";
import currency from 'currency.js';

const PriceTable = ({ prices, isWholesaleAndRetail }) => {

    const Price = ({ $ }) => (currency($, { decimal: ",", separator: "." }).format())
    return (
        <Grid.Container direction="column">
            {
                isWholesaleAndRetail == true &&
                <Grid>
                    <Text h3>
                        Venta por menor:
                    </Text>
                    {
                        prices.retail.minPerUnit > 0 && prices.retail.pricePerUnit > 0 &&
                        <>
                            <Text h4>
                                Por unidad
                            </Text>
                            <Grid.Container>
                                <Grid xs={6}>
                                    <Grid.Container direction="column">
                                        <Text weight="bold">Cant. Min.</Text>
                                        <Text >{prices.retail.minPerUnit}</Text>
                                    </Grid.Container>
                                </Grid>
                                <Grid xs={6}>
                                    <Grid.Container direction="column">
                                        <Text>Precio</Text>
                                        <Text ><Price $={prices.retail.pricePerUnit} /></Text>
                                    </Grid.Container>
                                </Grid>
                            </Grid.Container>
                        </>
                    }
                    {
                        prices.retail.minPerDozen > 0 && prices.retail.pricePerDozen > 0 &&
                        <>
                            <Text h4>
                                Por docena
                            </Text>
                            <Grid.Container>
                                <Grid xs={6}>
                                    <Grid.Container direction="column">
                                        <Text weight="bold">Cant. Min. de docenas</Text>
                                        <Text >{prices.retail.minPerDozen}</Text>
                                    </Grid.Container>
                                </Grid>
                                <Grid xs={6}>
                                    <Grid.Container direction="column">
                                        <Text weight="bold">Precio por unidad en la docena</Text>
                                        <Text ><Price $={prices.retail.pricePerDozen} /></Text>
                                    </Grid.Container>
                                </Grid>
                            </Grid.Container>
                        </>
                    }
                </Grid>
            }
            <Grid>
                <Text h3>
                    Venta por mayor:
                </Text>
                {
                    prices.wholesale.minPerUnit > 0 && prices.wholesale.pricePerUnit > 0 &&
                    <>
                        <Text h4>
                            Por unidad
                        </Text>
                        <Grid.Container>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerUnit}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio</Text>
                                    <Text ><Price $={prices.wholesale.pricePerUnit} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }
                {
                    prices.wholesale.minPerBigUnit > 0 && prices.wholesale.pricePerBigUnit > 0 &&
                    <>
                        <Text h4>
                            Por gran cantidad de unidades
                        </Text>
                        <Grid.Container>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerBigUnit}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio</Text>
                                    <Text ><Price $={prices.wholesale.pricePerBigUnit} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }


                {
                    //Per Dozen
                    prices.wholesale.minPerDozen > 0 && prices.wholesale.pricePerDozen > 0 &&
                    <>
                        <Text h4>
                            Por docena
                        </Text>
                        <Grid.Container>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerDozen}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio por unidad en la docena</Text>
                                    <Text ><Price $={prices.wholesale.pricePerDozen} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }
                {
                    prices.wholesale.minPerBigDozen > 0 && prices.wholesale.pricePerBigDozen > 0 &&
                    <>
                        <Text h4>
                            Por gran cantidad de docenas
                        </Text>
                        <Grid.Container>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerBigDozen}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio</Text>
                                    <Text ><Price $={prices.wholesale.pricePerBigDozen} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }

                {
                    //Per curve
                    prices.wholesale.minPerCurve > 0 && prices.wholesale.pricePerCurve > 0 && prices.wholesale.sizesPerCurve > 0 &&
                    <>
                        <Text h4>
                            Por curva
                        </Text>
                        <Grid.Container>
                            <Grid xs={4}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Talles por curva</Text>
                                    <Text >{prices.wholesale.sizesPerCurve}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={4}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerCurve}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={4}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio por unidad en la docena</Text>
                                    <Text ><Price $={prices.wholesale.pricePerCurve} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }
                {
                    prices.wholesale.minPerBigCurve > 0 && prices.wholesale.pricePerBigCurve > 0 &&
                    <>
                        <Text h4>
                            Por gran cantidad de curvas
                        </Text>
                        <Grid.Container>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Cant. Min.</Text>
                                    <Text >{prices.wholesale.minPerBigDozen}</Text>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container direction="column">
                                    <Text weight="bold">Precio</Text>
                                    <Text ><Price $={prices.wholesale.pricePerBigDozen} /></Text>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </>
                }

            </Grid>
        </Grid.Container>
    )
}

export default PriceTable