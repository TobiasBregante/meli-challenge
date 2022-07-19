import Page from '@Page'
import ProductModule from '@/src/components/modules/products/view'
import data from '@/utils/sampleProducts'

const ProductPage = () => {
  
  return (
    <Page>
      <ProductModule data={data[0]} />
    </Page>
  )
}

export default ProductPage