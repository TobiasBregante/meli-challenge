import ProductImageCarrousel from '@/src/components/modules/products/view/imageCarrousel'
import ProductInfo from '@/components/modules/products/view/productInfo';
import ProductBottomRecomendation from '@/src/components/modules/products/carouseles/product';
import BrandProfileMinimal from '../../brand/minimalProfile';
import { Card, Grid } from '@nextui-org/react';
import ProductDescription from './description';
import ProductTimeStamp from './timestamp';
import jsCookie from 'js-cookie'
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

const ProductModule = ({ data, relateds, brandProducts }) => {
    const router = useRouter()

    if(!data) {
        return null
    }
    
    return (
        <Fragment>
            <Grid.Container direction="column">
                <Card>
                    <Grid.Container css={{ minWidth: 0 }}>
                        <Grid xs={12} md={7} >
                            <ProductImageCarrousel />
                        </Grid>
                        <Grid xs={12} md={5}>
                            <ProductInfo data={data} />
                        </Grid>
                    </Grid.Container>
                </Card>
                <Grid.Container css={{ mt: 20 }} gap={2}>
                    <Grid xs={12} md={8}>
                        <Card>
                            <Card.Body>
                                <ProductDescription data={data?.description} />
                                { jsCookie.get("sldtoken") && <ProductTimeStamp data={data}/>}
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <BrandProfileMinimal data={data?.brand} />
                    </Grid>
                </Grid.Container>
            </Grid.Container>
            <ProductBottomRecomendation data={relateds} title="Recomendados" />
            <ProductBottomRecomendation data={brandProducts} title={`De ${data?.brand?.brandName}`} />
        </Fragment>
    )

}

export default ProductModule;