import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import AdsModals from '@/src/components/modules/products/ads/modals'
import Get from '@/utils/hooks/get'

const Index = ({ website, wholesaleProducts, wholesaleAndRetailProducts, perQuantityProducts, perCurveProducts, popularProducts, popularBrands }) => {

  return (
    <Page>
      <Container lg css={{ mb: "$10" }}>
        {
          /**<AdsModals img={website.popup.img} link={website.popup.link}/> */
        }
        <HighLightCarousel data={website.highlights} />
        <ProductCarousel title="Productos venta por mayor" data={wholesaleProducts} link="/./page/products/wholesale" />
        <ProductCarousel title="Productos venta por menor y mayor" data={wholesaleAndRetailProducts} link="/./page/products/wholesaleAndRetail" />
        <CategoriesCarousel data={website.categories}/>
        <ProductCarousel title="Productos mas populares" data={popularProducts} link="/./page/products/popular"  />
        <BrandCarousel title="Marcas mas populares" data={popularBrands} />
        <ProductCarousel title="Productos venta por gran cantidad" data={perQuantityProducts} link="/./page/products/bigQuantity" />
        <ProductCarousel title="Productos venta por curva" data={perCurveProducts} link="/./page/products/curve" />
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {

  return {
    props: {
      wholesaleProducts: await Get("products/find/query?popular=false&premiunOnly=true&isWholesaleAndRetail=false&limit=10&isPublic=true").then(r => r.data).catch(() => []),
      wholesaleAndRetailProducts: await Get("products/find/query?premiunOnly=true&isWholesaleAndRetail=true&limit=10&isPublic=true").then(r => r.data).catch(() => []),
      perQuantityProducts: await Get("products/find/query?premiunOnly=true&perQuantity=true&limit=10&isPublic=true").then(r => r.data).catch(() => []),
      perCurveProducts: await Get("products/find/query?premiunOnly=true&perCurve=true&limit=10&isPublic=true").then(r => r.data).catch(() => []),
      popularProducts: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true").then(r => r.data).catch(() => []),
      popularBrands: await Get("brands/find/query?limit=10&premiunOnly=true").then(r => r.data).catch(() => []),
      website: await Get("website").then(r => r.data).catch(() => ({ }))
    }, // will be passed to the page component as props
  }
}