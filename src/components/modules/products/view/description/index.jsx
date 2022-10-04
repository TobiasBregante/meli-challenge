import { Grid, Text } from "@nextui-org/react"

const ProductDescription = ({data})=>{
    return (
        <Grid.Container css={{ mt: 20 }}>
            <Grid>
                <Text b h3>
                    Descripción
                </Text>
            </Grid>
            <Grid>
                <Text>
                    {data}
                </Text>
            </Grid>
        </Grid.Container>
    )
}
export default ProductDescription