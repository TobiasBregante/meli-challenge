import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
const CantRegisterBrand = () => {
    const router = useRouter()
    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    Ya registraste una marca
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <Button icon={<Icon id="home" />} auto css={{ color: "$dark", mr:10 }} onPress={() =>router.push("/./")}>
                    Volver al menu principal
                </Button>
                <Button icon={<Icon id="home" />} auto css={{ color: "$dark" }} onPress={() =>router.push("/./user/products/add")}>
                    Añadir mas producto
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default CantRegisterBrand