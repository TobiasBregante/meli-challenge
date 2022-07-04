import Page from '@Page'
import ProductCarousel from '@/components/modules/products/carousel'
import data from '@/utils/sampleProducts'

const Index = () => {
  
  return (
    <Page>
      <div className="container pt-3">
        <ProductCarousel title="Productos recien ingresados" data={data} />
        <ProductCarousel title="Productos destacados" data={data} />
        <ProductCarousel title="Lo mas populares" data={data} />
        <ProductCarousel title="Visto recientemente" data={data} />
        <ProductCarousel title="Ofertas del dia" data={data} />
      </div>
    </Page>
  )
}

export default Index