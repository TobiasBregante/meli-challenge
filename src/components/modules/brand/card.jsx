import { Button, Card, Grid, Text } from "@nextui-org/react"
import Image from "next/image"
import Stars from "../../ui/stars"
import Share from "../common/share"

const BrandCard = ({ data }) => {
    const prom = input => input?.reduce((prev, user) => parseInt(prev) + parseInt(user), 0) / input.length
    const rating = prom(data?.stats?.stars)
    return (
        <Card variant="flat" css={{ bg: "$white", height: 250 }} onClick={() => window.location = `/./brand/${data._id}`} isHoverable isPressable>
            <Grid.Container justify="center" css={{ position: 'absolute', mt: 95, "@xsMax": { mt: 10 }, }}>
                <Grid >
                        <Image src={`/${data.imgs && data?.imgs?.principal !== 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77' ? data.imgs.principal : "blank-profile-picture-g227b26ec4_640_fwvqox"}`} width={"90vw"} height={"90vh"} alt={data.brandName} className="rounded-circle " />
                </Grid>
            </Grid.Container>
            <Card.Body css={{ pb: 0 }}>
                <Text h4>
                    {data.brandName}
                </Text>
                <Grid.Container>
                    <Stars rating={rating}/>
                </Grid.Container>
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    <Share link={`/brand/${data._id}`} />
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default BrandCard