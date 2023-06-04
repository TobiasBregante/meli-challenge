import Image from 'next/image'
import currency from 'currency.js'
import Icon from '../../../ui/icons'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import { Avatar, Card, Grid, Text } from '@nextui-org/react'
import LocationBuilder from '../locationBuilder'
import { useEffect } from 'react'

const ProductCard = ({ data }) => {

    useEffect(() => {
        console.log(data.prices)
    }, [])

    if(!data) {
        return null
    }

    const lowestPriceSelect = () => {
        const {
            minPerCurve,
            minPerDozen,
            minPerQuantity,
            minPerTask,
            minPerWholesale,
            perCurve,
            perDozen,
            perQuantity,
            perTask,
            retail,
            wholesale
        } = data?.prices
        
        let prices = [
            minPerCurve
            || minPerDozen
            || minPerQuantity
            || minPerTask
            || minPerWholesale
            || perCurve
            || perDozen
            || perQuantity
            || perTask
            || retail
            || wholesale
        ]
        prices = prices.filter(price => price != 0 && price != undefined)
        
        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }


    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable>
            <a href={`/./product/${data._id}`}>
                <div style={{width: '100%', height: '300px', position: 'relative', display: 'block', textAlign: 'center', padding: 0, margin: 0}}>
                    <Image
                        style={{ display: 'block', margin: 'auto' }}
                        src={data.imgs[0]}
                        alt={data.title}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </a>
            <Grid.Container 
                className='bookmarkContain'
                justify="flex-end">
                <SaveBookmark _id={data._id} style={{ display: 'block', margin: 'auto' }}/>
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

                    {/* <Grid.Container>
                        <LocationBuilder data={data?.brand?.location} />
                    </Grid.Container> */}

                </Grid.Container>
            </Card.Body>
            <Card.Footer style={{ position: 'absolute', top: 0, right: 0, marginTop: 274 }}>
                <Grid.Container justify="flex-end">
                    {
                        data?.brand?.imgs?.principal &&
                        <Avatar src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${data?.brand?.imgs?.principal && data?.brand?.imgs?.principal !== 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77' ? data?.brand?.imgs?.principal : 'blank-profile-picture-g227b26ec4_640_fwvqox'}`} size="sm" />
                    }
                    <Text className='brandNameCard' css={{ bg: '$secondary', color: '$white' }}>
                        {data?.brand?.brandName}
                    </Text>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard