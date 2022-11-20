import ProductImageCarrousel from '@/src/components/modules/products/view/imageCarrousel'
import ProductInfo from '@/components/modules/products/view/productInfo';
import ProductLocation from '@/components/modules/products/view/location';
import ProductComments from '@/components/modules/products/view/comments';
import ProductSideBarRecomendation from '@/components/modules/products/view/relateds/sidebar';
import ProductBottomRecomendation from '@/src/components/modules/products/carouseles/product';
import BrandProfileMinimal from '../../brand/minimalProfile';
import { Card, Grid } from '@nextui-org/react';
import ProductReviews from './review';
import ProductDescription from './description';
import ProductTimeStamp from './timestamp';
import Head from 'next/head';

const ProductModule = ({ data, relateds,brandProducts }) => {
    return (
        <>
            <Head>
                <title>SaladaApp | {data?.title}</title>
                <meta name="description" content={data?.description} />
                <meta property="og:title" content={data?.title} />
                <meta property="og:description" content={data?.description} />
                <meta property="og:image" content={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_1920,q_auto/${data?.imgs[0]}`} />
            </Head>
            <Grid.Container direction="column">
                <Card>
                    <Grid.Container css={{ minWidth: 0 }}>
                        <Grid xs={12} md={7} >
                            <ProductImageCarrousel imgs={data.imgs} />
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
                                <ProductLocation data={data.brand.location} />
                                <ProductDescription data={data.description} />
                                <ProductTimeStamp data={data}/>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <BrandProfileMinimal data={data.brand} />
                    </Grid>
                </Grid.Container>

                <Grid.Container css={{ mt: 20 }} gap={2}>
                    <Grid xs={12} md={8}>
                        <ProductComments data={data} />
                    </Grid>
                </Grid.Container>
                <Grid.Container css={{ mt: 20 }} gap={2}>
                    <Grid xs={12} md={8}>
                        <ProductReviews data={data} />
                    </Grid>
                </Grid.Container>

            </Grid.Container>
            <ProductBottomRecomendation data={relateds} title="Recomendados" />
            <ProductBottomRecomendation data={brandProducts} title="Mas productos del vendedor" />
        </>
    )

}

export default ProductModule;