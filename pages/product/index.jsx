import Page from '@Page'
import ProductModule from '@/src/components/modules/products/view'
import data from '@/utils/sampleProducts'

const ProductPage = () => {
  
  return (
    <Page>
      <div className="container pt-5">
        <ProductModule data={data[0]} />
      </div>
    </Page>
  )
}

export default ProductPage