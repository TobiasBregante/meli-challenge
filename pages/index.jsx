import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import productsData from '@/utils/sampleProducts'
import highlightsData from '@/utils/sampleHighlights'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import storesData from '@/src/utils/sampleStores'
import UnorderedList from '@/src/components/modules/products/list/unordered'

const Index = ({highlights,products, stores, popular, perCurve, perTask, perBigQuantity}) => {

  return (
    <Page>
      <Container lg css={{mb:"$10"}}>
        <HighLightCarousel data={highlights}/>
        <ProductCarousel title="Productos venta por mayor" data={products} link="/./page/retail" />
        <ProductCarousel title="Productos venta por menor y mayor" data={products}  link="/./page/wholesale" />
        <CategoriesCarousel />
        <BrandCarousel title="Marcas mas populares" data={stores} />
        <UnorderedList title="Productos mas populares" data={popular} link="/./page/popular" showSeeMore={true}/>
        <ProductCarousel title="Productos venta por gran cantidad" data={perBigQuantity} link="/./page/retail" />
        <ProductCarousel title="Productos venta por tarea" data={perTask} link="/./page/retail" />
        <ProductCarousel title="Productos venta por curva" data={perCurve} link="/./page/retail" />
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {

  return {
    props: {
      stores:storesData(),
      products:productsData(),
      highlights:highlightsData(),
      popular:productsData(12),
      perBigQuantity: productsData(),
      perTask: productsData(),
      perCurve: productsData(),
    }, // will be passed to the page component as props
  }
}