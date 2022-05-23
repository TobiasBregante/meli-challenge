import Text from '@/ui/texts'
import Image from 'next/image';
import Card from '@/ui/cards'
import ProductImageCarrousel from '@/components/modules/products/view/imageCarrousel'

const ProductModule = ({ data }) => {

    return (
        <Card rounded={12}>
            <div className="row">
                <div className="col-12 col-lg-7">
                    <ProductImageCarrousel imgs={data.imgs}/>
                </div>
                <div className="col-12 col-lg-5 d-flex flex-column p-3">
                    <div className="d-flex justify-content-end">
                        <Text tag="h2">
                            {data.title}
                        </Text>
                    </div>
                    
                </div>
            </div>
            <br /><br /><br /><br />
        </Card>
    );
}

export default ProductModule;