import Icon from '@/src/components/ui/icons'
import { Button, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
const ShouldBePremiun = () => {
    const router = useRouter()
    return (
        <Grid.Container direction="column">
            <Grid.Container justify="center">
                <Text h2>
                    Has alcanzado el limite de 5 productos
                </Text>
            </Grid.Container>
        </Grid.Container>
    )
}
export default ShouldBePremiun