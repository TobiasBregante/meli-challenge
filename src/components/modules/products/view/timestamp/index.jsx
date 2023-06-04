import timeago from "@/src/utils/timeago"
import { Button, Grid } from "@nextui-org/react"

const ProductTimeStamp = ({ data }) => {
    return (
        <Grid.Container justify="space-between" css={{mt:20}}>
            <Grid>
                <Button color="gray" auto>
                    Creado: {timeago(data?.createdAt)}
                </Button>
            </Grid>
            <Grid>
                <Button color="gray" auto>
                    Vence: {timeago(data?.status?.publicUntil)}
                </Button>
            </Grid>
        </Grid.Container>
    )
}

export default ProductTimeStamp