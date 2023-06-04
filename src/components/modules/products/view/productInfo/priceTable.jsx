import Icon from "@/src/components/ui/icons"
import { Grid, Text } from "@nextui-org/react";
import currency from 'currency.js';

const PriceTable = ({ prices }) => {

    const Price = ({ $ }) => (currency($, { decimal: ",", separator: "." }).format())
    return (
        <Grid.Container direction="column">
            {
                prices.retail > 0 &&
                <Grid>
                    <Grid.Container>
                        <Grid xs={6}>
                            <Grid.Container direction="column">
                                <Text><Price $={prices.retail} /></Text>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Grid>
            }
        </Grid.Container>
    )
}

export default PriceTable