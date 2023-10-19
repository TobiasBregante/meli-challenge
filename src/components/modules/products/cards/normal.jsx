import Image from "next/legacy/image"
import currency from 'currency.js'
import { Card, Text } from '@nextui-org/react'
import Link from '@/src/utils/hooks/link'

const ProductCard = ({ data, className }) => {
    if (!data) {
        return null
    }

    const getRandomImg = max => Math.floor(Math.random() * max);

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
        <Card variant="flat" css={{ bg: "$white", }} isHoverable className={`productCard ${className}`}>
            <Link href={`/product/${data._id}`} className='productCardLink'>
                <div className='containProductImageCard'>
                    <div className='productImageCard'>
                        <Image
                            style={{ display: 'block', margin: 'auto' }}
                            src={data?.imgs[getRandomImg(data?.imgs?.length - 1)]}
                            alt={data?.title}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                </div>
                <Card.Body css={{ pb: 0, overflow: "hidden" }} className='productInfo'>
                    <Text>

                        {data?.title?.length > 95 ? `${data?.title?.slice(0, 95)}...` : data?.title}

                    </Text>
                    <Text className='priceNormal'>
                        {lowestPriceSelect()}
                    </Text>
                    <Text className='stock'>                    
                            {data?.stock > 0 ? `${data?.stock} unidades` : 'Consultar disponibilidad'}                      
                    </Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default ProductCard