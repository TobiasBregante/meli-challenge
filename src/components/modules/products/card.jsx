import Card from '@/ui/cards'
import Image from 'next/image'
import Text from '@/ui/texts'
import currency from 'currency.js'
import Icon from '../../ui/icons'
import {useState} from 'react'
import {motion} from 'framer-motion'

const ProductCard = ({ data}) => {
    
    
    return (
        <Card rounded={16} className="pointer">
            <Image
                className="rounded-top-16"
                src={`/img/${data.img}`}
                width={100}
                height={100}
                layout="responsive"
                alt={data.title}
            />
            <div className="card-body d-flex flex-column">
                <Text weight={700} className="h6" >
                    {data.title}
                </Text>
                <Text tag="small" className="d-flex flex-row">
                    <Icon id="pin_drop" className="fs-6 mt-01 me-1"/>
                    Pasillo: {data.location.corridor} -
                    Puesto: {data.location.store}
                </Text>
                <Text tag="small" className="d-flex flex-row">
                    <Icon id="store" className="fs-6 mt-01 me-1"/>
                    {data.seller}
                </Text>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <Icon id="shopping_cart" className="pointer"/>
                <Text weight={900}>
                    {currency(data.price, { decimal: ",", separator: "." }).format()}
                </Text>
            </div>
        </Card>
    )
}

export default ProductCard