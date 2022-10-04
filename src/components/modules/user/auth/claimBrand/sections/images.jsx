import ImageSelector from '@/components/modules/admin/website/assets/images'
import { Grid, Text } from '@nextui-org/react'

const BrandImages = ({ state, onChange }) => {

    return (
        <Grid.Container direction="column">
            <Grid>
                <Text b h4>
                    Añadir logo
                </Text>
            </Grid>
            <Grid>
                <ImageSelector state={state.principal} setState={onChange("principal")} hideLabel />
            </Grid>
        </Grid.Container>
    )
}

export default BrandImages