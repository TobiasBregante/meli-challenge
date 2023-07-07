import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import AdsModals from '@/src/components/modules/products/ads/modals'
import Get from '@/utils/hooks/get'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SelectCountry from '@/src/components/modules/selectCountry'

const Index = ({ website, popularProducts, popularBrands, Celulares, Autos, JoyasAccesorios, ArticuloDeTemporada, Mascotas, Electronica, Calzado }) => {
  const router = useRouter()
  const [toCountryPage, setToCountryPage] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.location?.pathname !== `/${router?.locale}/`) {
      setToCountryPage(true)
    } else {
      setToCountryPage(false)
    }
  }, [router])

  if (toCountryPage) {
    return <SelectCountry />
  }


  return (
    <Page categories={website?.categories}>
      <Container lg css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
        {/* <AdsModals img={website?.popup?.img} link={website?.popup?.link}/> */}
        <HighLightCarousel data={website.highlights} />
        <ProductCarousel title="Tendencia" data={popularProducts} categoryHidde={'Equipamiento'} link="/page/products/popular" />
        <ProductCarousel title="Calzado" data={Calzado} link="/page/products/calzado" />
        <ProductCarousel title="Temporada" data={ArticuloDeTemporada} link="/page/products/temporada" />
        <ProductCarousel title="Electrónica" data={Electronica} link="/page/products/electronica" />
        <BrandCarousel title="Marcas en tendencia" data={popularBrands} />
        <ProductCarousel title={`Joyas & Accesorios`} data={JoyasAccesorios} link="/page/products/joyas" />
        <ProductCarousel title="Mascotas" data={Mascotas} link="/page/products/mascotas" />
        <ProductCarousel title="Celulares" data={Celulares} link="/page/products/celulares" />
        <ProductCarousel title="Autos" data={Autos} link="/page/products/autos" />
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  return {
    props: {
      Autos: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Autos`).then(r => r.data).catch(() => []),
      Celulares: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Celulares`).then(r => r.data).catch(() => []),
      Calzado: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Calzado`).then(r => r.data).catch(() => []),
      Mascotas: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Accesorios para Mascotas`).then(r => r.data).catch(() => []),
      JoyasAccesorios: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Joyas y Accesorios`).then(r => r.data).catch(() => []),
      ArticuloDeTemporada: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Artículo de Temporada`).then(r => r.data).catch(() => []),
      Electronica: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&product_category=Electrónica`).then(r => r.data).catch(() => []),
      popularProducts: await Get(`/${ctx?.locale}/products/find/query?popular=false&premiunOnly=true&limit=10&isPublic=true&hidde=Equipamiento`).then(r => r.data).catch(() => []),
      popularBrands: await Get(`/${ctx?.locale}/brands/find/query?limit=10&premiunOnly=true`).then(r => r.data).catch(() => []),
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({}))
    }, // will be passed to the page component as props
  }
}