import { Button, Card, Grid, Text } from "@nextui-org/react"
import Image from "next/legacy/image"
import Share from "../common/share"

const BrandCard = ({ data }) => {
    const prom = input => input?.reduce((prev, user) => parseInt(prev) + parseInt(user), 0) / input.length
    const toBrand = () => window.location = `brand/${data._id}`

    return (
        <Grid xs={12}>
            <Card variant="flat" className="brand-card" css={{ w: '100%', height: 207 }} onClick={toBrand} isHoverable isPressable>
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
                            <Image src={`/img/avatars/1.png`} width={62} height={62} alt={data.brandName} className="rounded-brand " />
                        </div>
                    </Grid>
                    <div className="circle" />
                    <div className="circle-2" />
                </Card.Body>
            </Card>
        </Grid>
    )
}

export default BrandCard