import Image from "next/legacy/image"
import currency from 'currency.js'
import { Button, Card, Text } from '@nextui-org/react'
import Link from '@/src/utils/hooks/link'
import { addToCart, getTotalCartValue } from "@/src/context/cartContext"
import { useEffect } from "react"

const ProductCard = ({ data, className }) => {
    if (!data) {
        return null
    }

    const totalValue = getTotalCartValue()
    useEffect(() => console.log(totalValue), [totalValue])

    const getRandomImg = max => Math.floor(Math.random() * max);

    const lowestPriceSelect = () => {
        const { retail } = data?.prices

        let prices = [retail]
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
                            src={'/img/e5.webp'}
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
            <button type="button" className="addToCartBtnCard" onClick={() => addToCart(data)}>+</button>
        </Card>
    )
}

export default ProductCard