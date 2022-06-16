import Icon from '@/src/components/ui/icons';
import Text from '@/ui/texts'
import ProductCardHorizontal from '../../cards/horizontal';
import Data from '@/utils/sampleProducts'

const ProductInfo = ({ }) => {
    return (
        <div className="row mt-2">
            <Text tag="h3" className="ms-2">
                Mas productos del vendedor
            </Text>
            {
                Data.slice(0, 4).map((cardData, cardI) => (
                    <div className="mb-3" key={cardI}>
                        <ProductCardHorizontal data={cardData} />
                    </div>
                ))
            }
        </div>
    )
}

export default ProductInfo
