import Image from 'next/image'
import currency from 'currency.js'
import Icon from '../../../ui/icons'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import { Avatar, Card, Grid, Text } from '@nextui-org/react'
import LocationBuilder from '../locationBuilder'
import { useEffect } from 'react'

const ProductCard = ({ data }) => {
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
            retail
            || minPerCurve
            || minPerDozen
            || minPerQuantity
            || minPerTask
            || minPerWholesale
            || perCurve
            || perDozen
            || perQuantity
            || perTask
            || wholesale
        ]
        prices = prices.filter(price => price != 0 && price != undefined)
        
        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }


    return (
        <Card variant="flat" css={{ bg: "$white" }} isHoverable className='productCard'>
            <a href={`/./product/${data._id}`}>
                <div style={{width: '100%', height: '174px', position: 'relative', display: 'block', textAlign: 'center', padding: 0, margin: 'auto'}}>
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
            <Card.Body css={{ pb: 0, overflow: "hidden" }} className='productInfo'>
                <Text weight="normal" h5 css={{ color: '$heading', fontWeight: 600, fontSize: 18 }}>
                    {data?.title?.length > 18 ? `${data?.title?.slice(0, 15)}...` : data?.title}
                </Text>
                <Text weight="bold" h4 css={{ color: '$heading', fontWeight: 700, fontSize: 16 }}>
                    {lowestPriceSelect()}
                </Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard