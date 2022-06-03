import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import Text from '@/ui/texts'
import Image from 'next/image';
import Button from '@/src/components/ui/buttons';
import Stars from '@/src/components/ui/stars'
import SaveBookmark from '@/components/modules/products/saveBookmark'

const ProductInfo = ({ data }) => {
    return (
        <>
            <div className="mx-3">
                <div className="d-flex justify-content-end">
                    <SaveBookmark _id={data._id} className="me-2"/>
                </div>
                <div className="d-flex ">
                    <Text tag="h2" weight={700}>
                        {data.title}
                    </Text>
                </div>
                <div className="d-flex ">
                    <Text tag="h3" >
                        {currency(data.price, { decimal: ",", separator: "." }).format()}
                    </Text>
                </div>
                <div className="d-flex ">
                    <Text >
                        <Icon id="pin_drop" className="fs-6 mt-01 me-1" />
                        Galpon: {data.location.shed} -
                        Pasillo: {data.location.corridor} -
                        Puesto: {data.location.store}
                    </Text>
                </div>
                <div className="d-flex">
                    <Stars rating={5} />
                    <Text className="mt-01">
                        359 calificaciones
                    </Text>
                </div>
            </div>
            <div className="mx-3">
                <div className="d-flex pointer mt-3 mb-1">
                    <Button color="success-700" className="w-100 justify-content-center">
                        <Icon id="whatsapp" />
                        Contactar
                    </Button>
                </div>
                <div className="d-flex pointer mb-3">
                    <Button color="info-500" className="w-100 justify-content-center me-1">
                        <Icon id="pin_drop" />
                        Ubicación
                    </Button>
                    <Button color="primary-500" className="w-100 justify-content-center ">
                        <Icon id="share" />
                        Compartir
                    </Button>
                </div>
                <div className="d-flex  pointer">
                    <Image
                        className="rounded-circle  "
                        src={`/img/${data.sellerImage}`}
                        width={50}
                        height={50}
                        alt="sellerImage"
                    />
                    <Text tag="h4" className="mt-2 ms-2">
                        {data.seller}
                    </Text>
                </div>
            </div></>
    )
}

export default ProductInfo