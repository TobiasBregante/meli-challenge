
import Card from '@/ui/cards'
import ProductImageCarrousel from '@/components/modules/products/view/imageCarrousel'
import ProductInfo from '@/components/modules/products/view/productInfo';

const ProductModule = ({ data }) => {

    return (
        <Card rounded={12}>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <ProductImageCarrousel imgs={data.imgs} />
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column justify-content-between p-3">
                    <ProductInfo data={data}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    
                </div>
            </div>
        </Card>
    );
}

export default ProductModule;