import Card from '@/ui/cards'
import Image from 'next/image'
import Text from '@/ui/texts'
import currency from 'currency.js'
import Icon from '../../../ui/icons'
import Link from 'next/link'
import SaveBookmark from '@/components/modules/products/saveBookmark'

const ProductCardHorizontal = ({ data }) => {
    return (
        <Card rounded={16} className="d-flex flex-column">
            <div className="d-flex flex-row">
                <Image
                    className="rounded-left-16 pointer"
                    src={`/img/${data.img}`}
                    width={120}
                    height={100}
                    alt={data.title}
                />
                <div className="card-body d-flex flex-column p-0">
                    <div className="p-3">
                        <Text weight={700} className="h6" >
                            {data.title}
                        </Text>
                        <Text tag="small" className="d-flex flex-row">
                            <Icon id="pin_drop" className="fs-6 mt-01 me-1" />
                            Pasillo: {data.location.corridor} -
                            Puesto: {data.location.store}
                        </Text>
                        <Text tag="small" className="d-flex flex-row">
                            <Icon id="store" className="fs-6 mt-01 me-1" />
                            {data.seller}
                        </Text>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div>
                            <SaveBookmark _id={data._id} className="me-2" />
                        </div>
                        <Text weight={900}>
                            {currency(data.price, { decimal: ",", separator: "." }).format()}
                        </Text>
                    </div>
                </div>
            </div>

        </Card>
    )
}

export default ProductCardHorizontal