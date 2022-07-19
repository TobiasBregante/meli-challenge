import Image from 'next/image'
import currency from 'currency.js'
import Icon from '../../../ui/icons'
import Link from 'next/link'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import { Avatar, Card, Grid, Text } from '@nextui-org/react'

const ProductCard = ({ data }) => {
    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable>
            <Link href={`/./product/${data._id}`}>
                <Image
                    className="rounded-top-16 pointer"
                    src={`/img/${data.img}`}
                    width={100}
                    height={100}
                    layout="responsive"
                    alt={data.title}
                />
            </Link>
            <Grid.Container css={{ position: "absolute", mt: 5, mr: 10 }} justify="flex-end">
                <SaveBookmark _id={data._id} />
            </Grid.Container>
            <Card.Body css={{ pb: 0, overflow: "hidden" }}>
                <Text weight="bold" h4 css={{ color: "$primary" }}>
                    {currency(data.price, { decimal: ",", separator: "." }).format()}
                </Text>
                <Grid.Container direction="column" justify="space-between">
                    <Grid.Container>
                        <Text weight="normal" h5 >
                            {data.title}
                        </Text>
                    </Grid.Container>
                    <Grid.Container>
                        <Icon id="pin_drop" css={{ fs: "1rem !important" }} />
                        <Text small>
                            galpon: {data.location.shed} &nbsp;
                        </Text>
                        <Text small >

                            Pasillo: {data.location.corridor} -
                            Puesto: {data.location.store}
                        </Text>
                    </Grid.Container>
                </Grid.Container>
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    <Avatar src={`/./img/${data.sellerImage}.jpg`} size="sm" />
                    <Text css={{ ml: 5 }}>
                        {data.seller}
                    </Text>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard