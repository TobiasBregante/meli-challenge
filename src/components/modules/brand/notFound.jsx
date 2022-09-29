import { Grid, Text } from "@nextui-org/react"

const BrandNotFound = ({ isPaused }) => {
    return (
        <Grid.Container justify="center">
            {
                isPaused ?
                    <Text h2>
                        Esta marca aun no a sido validada
                    </Text>
                    :
                    <Text h2>
                        No encontramos la marca que estas buscando
                    </Text>
            }
        </Grid.Container>
    )
}

export default BrandNotFound