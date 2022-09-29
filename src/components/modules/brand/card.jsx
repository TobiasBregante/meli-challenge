import { Button, Card, Grid, Text } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import Stars from "../../ui/stars"
import Share from "../common/share"

const BrandCard = ({ data }) => {
    const rating = data.stats?.stars == undefined ? 5 : Math.round(data.stats.stars.reduce((a, b) => a + b, 0) / data.stats.stars.length)

    const LocationBuilder = () => {
        if (data.location.zone == "online") {
            return (
                <>
                    <Text small css={{ mt: 5 }}>
                        Solo venta online
                    </Text>
                </>
            )
        }
        if (data.location.zone == "la salada") {
            return (
                <>
                    <Text small>
                        La salada &nbsp;
                    </Text>
                    <Text small>
                        {data.location.shed} &nbsp;
                    </Text>
                    <Text small >
                        Puesto: {data.location.stallNumber}
                    </Text>
                </>
            )
        }
        if (data.location.zone == "flores") {
            return (
                <>
                    <Text small>
                        Flores &nbsp;
                    </Text>
                    <Text small>
                        {data.location.street} &nbsp;
                    </Text>
                    <Text small >
                        {data.location.streetNumber} &nbsp;
                    </Text>
                    <Text small>
                        Local:{
                            data.location.positionInGallery
                        }
                    </Text>
                </>
            )
        }

        return (
            <>
                <Text small>
                    galpon: {data.location.shed} &nbsp;
                </Text>
                <Text small >

                    Pasillo: {data.location.corridor} -
                    Puesto: {data.location.store}
                </Text>
            </>
        )
    }
    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable isPressable>
            <Link href={`/./brand/${data._id}`}>
                <Image src={`/${data.imgs ? data.imgs.background : "brandImgBackground"}`} width={1280} height={720} alt={data.brandName}
                    className="blured" />
            </Link>
            <Grid.Container justify="center" css={{ position: 'absolute', mt: 95, "@xsMax": { mt: 10 }, }}>
                <Grid >
                    <Link href={`/./brand/${data._id}`}>
                        <Image src={`/${data.imgs ? data.imgs.principal : "brandImgDefault"}`} width={"90vw"} height={"90vh"} alt={data.brandName} className="rounded-circle " />
                    </Link>
                </Grid>
            </Grid.Container>
            <Card.Body css={{ pb: 0 }}>
                <Text h4>
                    {data.brandName}
                </Text>
                <Grid.Container>
                    <LocationBuilder />

                </Grid.Container>
                <Grid.Container>
                    <Stars rating={rating} />
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