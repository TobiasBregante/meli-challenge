import Card from '@/ui/cards'
import ProductImageCarrousel from '@/src/components/modules/products/view/imageCarrousel'
import ProductInfo from '@/components/modules/products/view/productInfo';
import ProductLocation from '@/components/modules/products/view/location';
import ProductComments from '@/components/modules/products/view/comments';
import ProductSideBarRecomendation from '@/components/modules/products/view/relateds/sidebar';
import ProductBottomRecomendation from '@/src/components/modules/products/carouseles/product';
import BrandProfileMinimal from '../../brand/minimalProfile';
import Data from '@/utils/sampleProducts'

const ProductModule = ({ data }) => {

    return (
        <div className="d-flex flex-column">
            <Card rounded={12}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <ProductImageCarrousel imgs={data.imgs} />
                    </div>
                    <div className="col-12 col-lg-4 d-flex flex-column justify-content-between p-3">
                        <ProductInfo data={data} />
                    </div>
                </div>
            </Card>

            <div className="row mt-2">
                <div className="col-12 col-lg-8 mb-2">
                    <Card rounded={12} >
                        <ProductLocation data={data} />
                    </Card>
                    <div className="mt-2">
                        <Card rounded={12} >
                            <ProductComments data={data} />
                        </Card>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <BrandProfileMinimal/>
                    <ProductSideBarRecomendation />
                </div>
                <div className="col-12 col-lg-8">
                    <ProductBottomRecomendation title="Recomendados" data={Data}/>
                </div>
            </div>
        </div>
    );
}

export default ProductModule;