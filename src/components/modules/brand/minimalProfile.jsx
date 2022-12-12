import Image from 'next/image'
import Icon from '@/ui/icons'
import Share from '@/components/modules/common/share'
import { Button, Card, Grid, Text } from '@nextui-org/react'

const BrandProfileMinimal = ({ data, hideFullProfile }) => {
   
    return (
        <Card rounded={16} className="d-flex flex-column p-3">
            <Card.Body>
                <Grid.Container justify="center">
                    <Image
                        className="rounded-circle pointer"
                        src={data.imgs?.principal !== undefined ? data.imgs.principal : "brandImgDefault"}
                        width={100}
                        height={100}
                        alt="als"
                    />
                </Grid.Container>
                <Text h3 className="text-center">
                    {data.brandName}
                </Text>
                <Grid.Container justify="space-between">
                    <Text weight="800" className="d-flex flex-row">
                        <Icon id="payments" css={{ mr: 5 }} />
                        Metodo de pago:
                    </Text>
                    <Text >
                        {data.payMethod.join(" - ")}
                    </Text>
                </Grid.Container>
                <Grid.Container justify="space-between">
                    <Text weight="800" className="d-flex flex-row">
                        <Icon id="local_shipping" css={{ mr: 5 }} />
                        Medio de envio:
                    </Text>
                    <Text >
                        {data.shippingBy}
                    </Text>
                </Grid.Container>
                {
                    (hideFullProfile == false || hideFullProfile == undefined) &&
                    <a href={`/./brand/${data._id}`}>
                        <Button color="secondary" icon={<Icon id="open_in_new" color="white" />} css={{ mb: 10 }}>
                            Ver catalogo completo
                        </Button>
                    </a>
                }
                <Share link={`/brand/${data._id}`} />
            </Card.Body>
        </Card>
    )
}

export default BrandProfileMinimal