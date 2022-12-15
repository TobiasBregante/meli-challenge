import Image from 'next/image'
import currency from 'currency.js'
import Icon from '../../../ui/icons'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import { Avatar, Card, Grid, Text } from '@nextui-org/react'
import LocationBuilder from '../locationBuilder'

const ProductCard = ({ data }) => {

    if(!data) {
        return null
    }

    const lowestPriceSelect = () => {
        let prices = [data.prices.retail, data.prices.wholesale, data.prices.perDozen, data.prices.perCurve, data.prices.perTask, data.prices.perQuantity]
        prices = prices.filter(price => price != 0 && price != undefined)

        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }


    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable>
            <a href={`/./product/${data._id}`}>
                <Image
                    className="rounded-top-16 pointer"
                    src={data.imgs[0]}
                    width={300}
                    height={300}
                    alt={data.title}
                />
            </a>
            <Grid.Container css={{ position: "absolute", mt: 5, mr: 10 }} justify="flex-end">
                <SaveBookmark _id={data._id} />
            </Grid.Container>
            <Card.Body css={{ pb: 0, overflow: "hidden" }}>
                <Text weight="bold" h4 css={{ color: "$primary" }}>
                    {lowestPriceSelect()}
                </Text>
                <Grid.Container direction="column" justify="space-between">
                    <Grid.Container>
                        <Text weight="normal" h5 >
                            {data.title}
                        </Text>
                    </Grid.Container>

                    <Grid.Container>
                        <LocationBuilder weight="bold" size={18} data={data?.brand?.location} />
                    </Grid.Container>

                </Grid.Container>
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    {
                        data?.brand?.imgs?.principal &&
                        <Avatar src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${data.brand.imgs.principal}`} size="sm" />
                    }
                    <Text css={{ ml: 5 }}>
                        {data?.brand?.brandName}
                    </Text>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard