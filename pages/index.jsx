import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import AdsModals from '@/src/components/modules/products/ads/modals'
import Get from '@/utils/hooks/get'

const Index = ({ website, popularProducts, popularBrands, Celulares, Autos, Accesorios, ArticuloDeTemporada, Mascotas, Electronica, Bijouterie, Calzado }) => { 
  return (
    <Page categories={website?.categories}>
      <Container lg css={{ mb: "$10" }}>
        <AdsModals img={website?.popup?.img} link={website?.popup?.link}/>
        {/* <HighLightCarousel data={website.highlights} /> */}
        <ProductCarousel title="Tendencia" data={popularProducts} categoryHidde={'Equipamiento'} link="/page/products/popular"/>
        <CategoriesCarousel data={website?.categories}/>
        <ProductCarousel title="Calzado" data={Calzado} link="/page/products/calzado"/>
        <ProductCarousel title="Temporada" data={ArticuloDeTemporada} link="/page/products/temporada"/>
        <ProductCarousel title="Electrónica" data={Electronica} link="/page/products/electronica"/>
        <BrandCarousel title="Marcas en tendencia" data={popularBrands} />
        <ProductCarousel title="Bijouterie" data={Bijouterie} link="/page/products/bijouterie"/>
        <ProductCarousel title="Accesorios" data={Accesorios} link="/page/products/accesorios"/>
        <ProductCarousel title="Mascotas" data={Mascotas} link="/page/products/mascotas"/>
        <ProductCarousel title="Celulares" data={Celulares} link="/page/products/celulares"/>
        <ProductCarousel title="Autos" data={Autos} link="/page/products/autos"/>
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  return {
    props: {
      Autos: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Autos").then(r => r.data).catch(() => []),
      Celulares: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Celulares").then(r => r.data).catch(() => []),
      Calzado: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Calzado").then(r => r.data).catch(() => []),
      Mascotas: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Mascotas").then(r => r.data).catch(() => []),
      Accesorios: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios").then(r => r.data).catch(() => []),
      ArticuloDeTemporada: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Artículo de Temporada").then(r => r.data).catch(() => []),
      Electronica: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Electrónica").then(r => r.data).catch(() => []),
      Bijouterie: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Bijouterie").then(r => r.data).catch(() => []),
      popularProducts: await Get("products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&hidde=Equipamiento").then(r => r.data).catch(() => []),
      popularBrands: await Get("brands/find/query?limit=10&premiunOnly=true").then(r => r.data).catch(() => []),
      website: await Get("website").then(r => r.data).catch(() => ({ }))
    }, // will be passed to the page component as props
  }
}