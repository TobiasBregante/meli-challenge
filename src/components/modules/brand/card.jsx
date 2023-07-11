import { Button, Card, Grid, Text } from "@nextui-org/react"
import Image from "next/legacy/image"
import Stars from "../../ui/stars"
import Share from "../common/share"

const BrandCard = ({ data }) => {
    const prom = input => input?.reduce((prev, user) => parseInt(prev) + parseInt(user), 0) / input.length
    const rating = prom(data?.stats?.stars)
    return (
        <Card variant="flat" className="brand-card" css={{ w: 389, height: 207 }} onClick={() => window.location = `brand/${data._id}`} isHoverable isPressable>
            <Card.Body css={{ pb: 0 }}>
                <Grid>
                    <Text css={{ pt: 9, pb: 9, mb: 12 }}>
                        <span style={{
                            color: '#000',
                            fontSize: 14,
                            letterSpacing: 1.4,
                            padding: 9,
                            borderRadius: 8,
                            w: 'auto',
                            backgroundColor: 'rgba(255, 255, 255, .5)'
                        }}>
                            {data.brandName}
                        </span>
                    </Text>
                </Grid>
                <Grid>
                    <div>
                        <Image src={`/${data.imgs && data?.imgs?.principal !== 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77' ? data.imgs.principal : "blank-profile-picture-g227b26ec4_640_fwvqox"}`} width={62} height={62} alt={data.brandName} className="rounded-brand " />
                    </div>
                </Grid>
                <div className="circle"/>
                <div className="circle-2"/>
                {/* <Grid.Container>
                    <Stars rating={rating}/>
                </Grid.Container> */}
            </Card.Body>
        </Card>
    )
}

export default BrandCard