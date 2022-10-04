import Icon from "@/src/components/ui/icons"
import { Grid, Text } from "@nextui-org/react";
import currency from 'currency.js';

const PriceTable = ({ prices, isWholesaleAndRetail }) => {

    const Price = ({ $ }) => (currency($, { decimal: ",", separator: "." }).format())
    return (
        <Grid.Container direction="column">
            {
                (isWholesaleAndRetail == true && prices.retail > 0) &&
                <Grid>
                    <Text h3>
                        Venta por menor:
                    </Text>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text>Precio</Text>
                                <Text ><Price $={prices.retail} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
            {
                prices.wholesale > 0 &&
                <Grid>
                    <Text h3>
                        Venta por mayor:
                    </Text>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text b>Precio</Text>
                                <Text ><Price $={prices.wholesale} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
            {
                prices.perDozen > 0 &&
                <Grid>
                    <Text h3>
                        Venta por docena:
                    </Text>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text b>Precio</Text>
                                <Text ><Price $={prices.perDozen} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
            {
                prices.perCurve > 0 &&
                <Grid>
                    <Text h3>
                        Venta por curva:
                    </Text>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text b>Precio</Text>
                                <Text ><Price $={prices.perCurve} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
            {
                prices.perQuantity > 0 &&
                <Grid>
                    <Text h3>
                        Venta por cantidad:
                    </Text>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text b>Precio</Text>
                                <Text ><Price $={prices.perQuantity} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
 
        </Grid.Container>
    )
}

export default PriceTable