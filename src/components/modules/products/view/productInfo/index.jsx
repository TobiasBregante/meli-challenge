import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import Image from 'next/image';
import Stars from '@/src/components/ui/stars'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import Share from '@/components/modules/common/share';
import { useState } from 'react';
import PriceTable from '@/components/modules/products/view/productInfo/priceTable'
import { Button, Grid, Text } from '@nextui-org/react';
import LocationBuilder from '../../locationBuilder';
import { useRouter } from 'next/router';
import Get from '@/src/utils/hooks/get';

const ProductInfo = ({ data }) => {
    const router = useRouter()

    const moveToLocation = ()=>{
        router.push("#location")
    }

    const lowestPriceSelect = () => {
        let prices = [data.prices.retail.pricePerUnit, data.prices.retail.pricePerDozen, data.prices.wholesale.pricePerUnit, data.prices.wholesale.pricePerBigUnit, data.prices.wholesale.pricePerDozen, data.prices.wholesale.pricePerBigDozen, data.prices.wholesale.pricePerCurve, data.prices.wholesale.pricePerBigCurve]

        prices = prices.filter(price => price != 0)

        //select priceToTalk if there isn't any price
        if (prices.length == 0 && (data.prices.wholesale.perUnitTalk || data.prices.wholesale.perDozenTalk || data.prices.wholesale.perCurveTalk)) {
            return "Precio a conversar"
        }

        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }

    const rating = data.stats?.stars == undefined ? 5 : Math.round(data.stats.stars.reduce((a, b) => a + b, 0) / data.stats.stars.length)

    const contact = ()=>{
        const msg = "Hola te contacto porque vi tu producto en la plataforma de la salada: "
        window.open(`https://api.whatsapp.com/send?text=${msg}${window.location.host}/product/${data._id}`)
        Get(`products/product/${data._id}/whatsappClick`)
    }

    return (
        <Grid.Container direction="column" justify="space-between" css={{ m: 15 }}>
            <Grid.Container direction="column" >
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
                        {lowestPriceSelect()}
                    </Text>
                </Grid.Container>
                <Grid.Container>
                    <LocationBuilder data={data.brand.location} useFull />
                </Grid.Container>
                <Grid.Container>
                    <Stars rating={rating} />
                    <Text>
                        {data.stats.stars != undefined ? data.stats.stars : 0} calificaciones
                    </Text>
                </Grid.Container>
                <PriceTable prices={data.prices} />
            </Grid.Container>
            <Grid.Container>
                <Button auto 
                iconRight={<Icon id="/whatsappicon" color="$white"/>} 
                css={{ bg: "$whatsapp", w:"100%", mb:10 }}
                onPress={contact}>
                    CONTACTAR
                </Button>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Button auto icon={<Icon id="pin_drop" color="$white"/>} onPress={moveToLocation}>
                            Ubicación
                        </Button>
                    </Grid>
                    <Grid>
                        <Share link={`/product/${data._id}`}/>
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default ProductInfo