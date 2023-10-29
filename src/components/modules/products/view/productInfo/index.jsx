import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import Stars from '@/src/components/ui/stars'
import SaveBookmark from '@/components/modules/products/saveBookmark'
import Share from '@/components/modules/common/share';
import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Get from '@/src/utils/hooks/get';
import WriteReview from '../review/write';
import { useUserContext } from '@/src/utils/user/provider';
import CheckoutPro from '@/src/components/payments/checkoutPro';
import categories from '@/src/utils/user/brand/categories';
import { SVGFlag } from 'use-flags';

const ProductInfo = ({ data }) => {
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

    const contact = `https://api.whatsapp.com/send?text=Hola, desde Iwarket! Quiero seguir mi pedido!&phone=${parseInt(data?.brand?.phone)}`
    const wholeSaleCategories = []

    categories?.forEach((cat, i) => {
        if (cat?.wholesale) {
            wholeSaleCategories.push(cat?.name)
        }
    })
    
    const isWholeSale = [data?.category]?.some(item => wholeSaleCategories?.includes(item))

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
                    <Grid.Container gap={1} justify='flex-start'>
                        <Grid>
                            <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                Suma puntos <Icon css={{ ml: 5, color: '$white' }} id={'rocket_launch'}/>
                            </Button>
                        </Grid>
                        <Grid>
                            <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                Envíos a todos el país!<Icon css={{ ml: 5, color: '$white' }} id={'local_shipping'}/>
                            </Button>
                        </Grid>
                        {
                            !isWholeSale && <Grid>
                                <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                    Disponible solo en <span style={{ marginLeft: 4 }}> <SVGFlag country={'ar'} fileType='webp' flagWidth={14} /></span>
                                </Button>
                            </Grid>
                        }
                        {
                            isWholeSale && (
                                <Fragment>
                                    <Grid>
                                        <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                            Envíos internacionales!<Icon css={{ ml: 5, color: '$white' }} id={'flight_takeoff'}/>
                                        </Button>
                                    </Grid>
                                </Fragment>
                            )
                        }
                    <Grid xs={12}>
                        <CheckoutPro data={data} contact={contact}/>
                    </Grid>
                    </Grid.Container>
                    <Grid>
                        <Share link={`product/${data?._id}`} />
                    </Grid>
                    {
                        isWholeSale && <Grid xs={12}>
                            <Grid.Container gap={0.5}>
                                <Grid xs={12}>
                                    <Text h4>
                                        Países disponibles comprando al por mayor
                                    </Text>
                                </Grid>
                                {router?.locales?.length > 0 && router?.locales?.map((obj, i) => <Grid key={i}><SVGFlag country={obj} fileType='webp' flagWidth={20} /></Grid>)}
                            </Grid.Container>
                        </Grid>
                    }
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default ProductInfo