import ProductImageCarrousel from '@/src/components/modules/products/view/imageCarrousel'
import ProductInfo from '@/components/modules/products/view/productInfo';
import ProductLocation from '@/components/modules/products/view/location';
import ProductComments from '@/components/modules/products/view/comments';
import ProductSideBarRecomendation from '@/components/modules/products/view/relateds/sidebar';
import ProductBottomRecomendation from '@/src/components/modules/products/carouseles/product';
import BrandProfileMinimal from '../../brand/minimalProfile';
import Data from '@/utils/sampleProducts'
import { Card, Grid } from '@nextui-org/react';

const ProductModule = ({ data }) => {


    return (
        <Grid.Container>
            <Card>
                <Grid.Container css={{minWidth:0}}>
                    <Grid xs={12} lg={7}>
                        <ProductImageCarrousel imgs={data.imgs} />
                    </Grid>
                    <Grid xs={12} lg={5}>
                        <ProductInfo data={data} />
                    </Grid>
                </Grid.Container>
            </Card>

        </Grid.Container>
    )

}

export default ProductModule;