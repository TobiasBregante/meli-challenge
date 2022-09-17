import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

const IsNotOwner = () => {
    const router = useRouter()
    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    No puedes editar esto porque no eres el dueño
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <Button icon={<Icon id="home" />} auto css={{ color: "$dark" }} onPress={() =>router.push("/./")}>
                    Volver al menu principal
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default IsNotOwner