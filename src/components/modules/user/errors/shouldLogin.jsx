import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

const ShouldLogin = () => {
    const router = useRouter()

    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    Debes iniciar sesión para ver esto
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <Button auto icon={<Icon id="person" />} css={{ color: "$dark" }} onPress={()=>router.push("/./user/auth/signin")}>
                    Ingresar
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default ShouldLogin