import currency from 'currency.js';
import Icon from '@/src/components/ui/icons';
import SaveBookmark from '@/components/modules/products/saveBookmark'
import Share from '@/components/modules/common/share';
import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Get from '@/src/utils/hooks/get';
import { useUserContext } from '@/src/utils/user/provider';
import Checkout from '@/src/components/payments/checkout';
import categories from '@/src/utils/user/brand/categories';
import { SVGFlag } from 'use-flags';

const ProductInfo = ({ data }) => {
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

    return (
        <Grid.Container direction="column" justify="space-between" css={{ m: 15 }}>
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
                    <Grid.Container gap={1} justify='flex-start'>
                        <Grid>
                            <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                Envíos a todos el país!<Icon css={{ ml: 5, color: '$white' }} id={'local_shipping'} />
                            </Button>
                        </Grid>

                        <Grid>
                            <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                Disponible solo en <span style={{ marginLeft: 4 }}> <SVGFlag country={'ar'} fileType='webp' flagWidth={14} /></span>
                            </Button>
                        </Grid>

                        <Fragment>
                            <Grid>
                                <Button shadow className="levelHeader" size={'xs'} color={'gradient'}>
                                    Envíos internacionales!<Icon css={{ ml: 5, color: '$white' }} id={'flight_takeoff'} />
                                </Button>
                            </Grid>
                        </Fragment>

                        <Grid xs={12}>
                            <Checkout data={data}/>
                        </Grid>
                    </Grid.Container>
                    <Grid>
                        <Share link={`product/${data?._id}`} />
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default ProductInfo