import { Grid, Text } from "@nextui-org/react"

const ProductDescription = ({data})=>{
    return (
        <Grid.Container css={{ mt: 20, d: 'block' }}>
            <Grid>
                <Text b h3>
                    Descripción
                </Text>
            </Grid>
            <Grid>
                <pre className="descriptionProd">
                    <Text>
                        {data}
                    </Text>
                </pre>
            </Grid>
        </Grid.Container>
    )
}
export default ProductDescription