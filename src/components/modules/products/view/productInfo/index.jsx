import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import Stars from '@/src/components/ui/stars'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import Share from '@/components/modules/common/share';
import { useState } from 'react';
import { Button, Grid, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Get from '@/src/utils/hooks/get';
import WriteReview from '../review/write';
import { useUserContext } from '@/src/utils/user/provider';
import CheckoutPro from '@/src/components/payments/checkoutPro';

const ProductInfo = ({ data }) => {
    const user = useUserContext()
    const [isWritingReview, setWriteReview] = useState(false)
    const router = useRouter()

    const lowestPriceSelect = () => {
        const {
            retail
        } = data?.prices
        
        let prices = [
            retail
        ]
        prices = prices.filter(price => price != 0 && price != undefined)
        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }

    let rating = data.reviews?.map(a => a.rating)
    rating = rating == undefined ? 5 : Math.round(rating.reduce((a, b) => a + b, 0) / rating.length)

    const contact = () => {
        if(user?.email){
            const productTitle = data?.title?.toUpperCase()
            const msg = `Hola, te contacto desde la plataforma Iwarket! Me interesa el producto: "${productTitle}"`
            window.open(`https://api.whatsapp.com/send?text=${msg}&phone=${parseInt(data?.brand?.phone)}`)
            Get(`/${router?.locale}/products/product/${data._id}/whatsappClick`)
    
            if (!data.reviews?.find(r => r.user._id == user._id)) {
                setWriteReview(true)
            }
        } else {
            router?.push(`/./${router?.locale}/user/auth/signup`)
        }
    }

    return (
        <Grid.Container direction="column" justify="space-between" css={{ m: 15 }}>
            <WriteReview open={isWritingReview} close={() => setWriteReview(false)} data={data} />
            <Grid.Container direction="column" >
                <Grid.Container justify="flex-end">
                    <SaveBookmark _id={data?._id} className="me-2" />
                </Grid.Container>
                <Grid.Container>
                    <Text h2 weight="bold">
                        {data?.title}
                    </Text>
                </Grid.Container>
                <Grid.Container>
                    <Text h3 weight="normal" >
                    {lowestPriceSelect()}
                    </Text>
                </Grid.Container>
                <Grid.Container gap={2}>
                    <Grid>
                        <Stars rating={rating} />
                        <Text>
                            {
                                data?.reviews?.length > 0 && <p>
                                    <strong>
                                        {data?.reviews?.length}
                                    </strong> {data?.reviews?.length < 2 ? 'calificación' : 'calificaciones'}
                                </p>
                            }
                        </Text>
                    </Grid>
                    <Grid.Container gap={1}>
                        <Grid xs={3}>
                            <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                Suma puntos <Icon css={{ ml: 5, color: '$white' }} id={'rocket_launch'}/>
                            </Button>
                        </Grid>
                        <Grid xs={3}>
                            <Button shadow className="levelHeader" size={'xs'} color={'primary'}>
                                Envío gratis<Icon css={{ ml: 5, color: '$white' }} id={'local_shipping'}/>
                            </Button>
                        </Grid>
                    </Grid.Container>
                    <Grid xs={12}>
                        <CheckoutPro data={data}/>
                    </Grid>
                    <Grid>
                        <Share link={`product/${data?._id}`} />
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default ProductInfo