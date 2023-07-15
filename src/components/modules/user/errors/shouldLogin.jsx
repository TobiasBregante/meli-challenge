import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

const ShouldLogin = () => {
    const router = useRouter()

    return (
        <Grid.Container direction="column" css={{ minHeight: '100vh' }}>
            <Grid.Container justify="center">
                <Text h2>
                    Debes iniciar sesión para ver esto
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <Button auto icon={<Icon id="person" color={'$white'}/>} css={{ color: "$white" }} onPress={()=>router.push(`/./${router?.locale}/user/auth/signin`)}>
                    Ingresar
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default ShouldLogin