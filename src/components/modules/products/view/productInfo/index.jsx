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
import WriteReview from '../review/write';
import { useUserContext } from '@/src/utils/user/provider';

const ProductInfo = ({ data }) => {
    const router = useRouter()
    const user = useUserContext()

    const [isWritingReview, setWriteReview] = useState(false)

    const moveToLocation = () => {
        router.push("#location")
    }

    const lowestPriceSelect = () => {
        let prices = [data.prices.retail, data.prices.wholesale, data.prices.perDozen, data.prices.perCurve, data.prices.perQuantity]
        prices = prices.filter(price => price != 0 && price != undefined)
        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }

    let rating = data.reviews?.map(a => a.rating)
    rating = rating == undefined ? 5 : Math.round(rating.reduce((a, b) => a + b, 0) / rating.length)

    let productImage = "https://res.cloudinary.com/saladapp/f_auto,c_limit,w_1920,q_auto/"

    const contact = () => {
        const productTitle = data.title.toUpperCase()
        const msg = `Hola, te contacto desde la plataforma SaladaApp! Me interesa el producto: "${productTitle}"`
        window.open(`https://api.whatsapp.com/send?text=${window.location}&phone=54${data.brand.phone}`)
        Get(`products/product/${data._id}/whatsappClick`)

        if (!data.reviews?.find(r => r.user._id == user._id)) {
            setWriteReview(true)
        }

    }

    return (
        
        <Grid.Container direction="column" justify="space-between" css={{ m: 15 }}>
            <WriteReview open={isWritingReview} close={() => setWriteReview(false)} data={data} />

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
                        {
                            data.reviews != undefined ?
                                data.reviews.length > 1 ?
                                    `${data.reviews.length} Calificaciones` : " 0 Calificaciónes"
                                : "0 Calificaciones"
                        }
                    </Text>
                </Grid.Container>
                <PriceTable prices={data.prices} />
            </Grid.Container>
            <Grid.Container>
                <Button auto
                    iconRight={<Icon id="/whatsappicon" color="$white" />}
                    css={{ bg: "$whatsapp", w: "100%", mb: 10 }}
                    onPress={contact}>
                    CONTACTAR
                </Button>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Button auto icon={<Icon id="pin_drop" color="$white" />} onPress={moveToLocation}>
                            Ubicación
                        </Button>
                    </Grid>
                    <Grid>
                        <Share link={`/product/${data._id}`} />
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default ProductInfo