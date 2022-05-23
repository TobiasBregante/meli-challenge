import Page from '@Page'
import ProductCarousel from '@/components/modules/products/carousel'
import data from '@/utils/sampleProducts'

const Index = () => {
  
  return (
    <Page>
      <div className="container pt-5">
        <ProductCarousel title="Lo mas populares" data={data} />
      </div>
    </Page>
  )
}

export default Index