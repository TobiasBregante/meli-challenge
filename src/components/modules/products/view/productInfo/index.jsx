import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import Image from 'next/image';
import Stars from '@/src/components/ui/stars'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import Share from '@/components/modules/common/share';
import { useState } from 'react';
import PriceTable from '@/components/modules/products/view/productInfo/priceTable'
import { Button, Grid, Text } from '@nextui-org/react';

const ProductInfo = ({ data }) => {
    const [isShareOpen, setShareState] = useState(false)


    return (
        <Grid.Container direction="column" css={{ m: 15 }}>
            <Grid.Container justify="flex-end">
                <SaveBookmark _id={data._id} className="me-2" />
            </Grid.Container>
            <Grid.Container>
                <Text h2 weight="bold">
                    {data.title}
                </Text>

            </Grid.Container>
            <Grid.Container>
                <Text h3 weight="normal" >
                    {currency(data.price, { decimal: ",", separator: "." }).format()}
                </Text>
            </Grid.Container>
            <Grid.Container>
                <Icon id="pin_drop" className="fs-6 mt-01 me-1" />
                <Text >
                    Galpon: {data.location.shed} -
                    Pasillo: {data.location.corridor} -
                    Puesto: {data.location.store}
                </Text>
            </Grid.Container>
            <Grid.Container>
                <Stars rating={data.rating} />
                <Text>
                    359 calificaciones
                </Text>
            </Grid.Container>

        </Grid.Container>
    )


    return (
        <>
            <div>
                <Share isVisible={isShareOpen} close={setShareState} />
                <div className="mb-3">
                    <div className="d-flex justify-content-end">
                        <SaveBookmark _id={data._id} className="me-2" />
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
                <div>
                    <PriceTable prices={[{ title: "minimo 10", value: 100 }]} />
                </div>
            </div>
            <div className="">
                <div className="d-flex pointer mt-3 mb-1">
                    <Button color="success-700" className="w-100 justify-content-center">
                        <Icon id="whatsapp" />
                        Contactar
                    </Button>
                </div>
                <div className="d-flex pointer mb-3">
                    <Button color="info-500" className="w-100 justify-content-center me-1" onClick={() => window.location.href = "#location"}>
                        <Icon id="pin_drop" />
                        Ubicación
                    </Button>
                    <Button color="primary-500" className="w-100 justify-content-center " onClick={() => setShareState(true)}>
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
            </div>
        </>
    )
}

export default ProductInfo