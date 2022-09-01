import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
const ShouldBeSeller = () => {
    const router = useRouter()
    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    Debes ser un vendedor para ver esto
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
export default ShouldBeSeller