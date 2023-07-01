import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
const ShouldHaveBrand = () => {
    const router = useRouter()
    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    Debes tener una tienda para poder añadir productos
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <Button icon={<Icon id="home" />} auto css={{ color: "$dark" }} onPress={() =>router.push("user/claimBrand")}>
                    Registrar marca
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default ShouldHaveBrand