import { Button, Card, Grid, Text } from "@nextui-org/react"
import Image from "next/image"
import Icon from "../../ui/icons"
import Stars from "../../ui/stars"
import Share from "../common/share"

const BrandCard = ({ data }) => {
    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable isPressable>
            <Image src={`/./img/${data.bgImg}.webp`} width={1280} height={720} alt="bg"
                className="blured" />
            <Grid.Container justify="center" css={{ position: 'absolute', mt: 80, }}>
                <Grid >
                    <Image src={`/./img/${data.img}.jpg`} width={120} height={120} alt="bg" className="rounded-circle " />
                </Grid>
            </Grid.Container>
            <Card.Body css={{ pb: 0 }}>
                <Text h4>
                    {data.seller}
                </Text>
                <Grid.Container>
                    <Icon id="pin_drop" />
                    <Text>
                        {data.location.shed} &nbsp;
                    </Text>
                    <Text>
                        pasillo: {data.location.corridor}
                    </Text>

                </Grid.Container>
                <Grid.Container>
                <Stars rating={data.rating}/>
                </Grid.Container>
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    
                    <Share/>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default BrandCard