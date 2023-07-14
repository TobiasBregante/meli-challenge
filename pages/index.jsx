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

const Index = ({ website, popularProducts, popularBrands, Celulares, Autos, RopaInformal, JoyasAccesorios, Mascotas, Electronica, Calzado }) => {
  const router = useRouter()
  const [toCountryPage, setToCountryPage] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.location?.pathname?.replaceAll('/', '') !== router?.locale) {
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
        <ProductCarousel title="Tendencia" bent={true} data={popularProducts} link="/category/popular" />
        <ProductCarousel title="Calzado" bent={true} data={Calzado} link="/category/Calzado" />
        <ProductCarousel title="Indumentaria" bent={true} data={RopaInformal} link="/category/Ropa Informal" />
        <ProductCarousel title="Electrónica" bent={true} data={Electronica} link="/category/Electrónica" />
        <BrandCarousel title="Marcas en tendencia" data={popularBrands} />
        <ProductCarousel title={`Joyas & Accesorios`} bent={true} data={JoyasAccesorios} link="/category/Joyas y Accesorios" />
        <ProductCarousel title="Mascotas" bent={true} data={Mascotas} link="/category/Accesorios para Mascotas" />
        <ProductCarousel title="Celulares" bent={true} data={Celulares} link="/category/Accesorios para Celulares" />
        <ProductCarousel title="Autos" bent={true} data={Autos} link="/category/Accesorios para Autos" />
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  return {
    props: {
      RopaInformal: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Ropa Informal')}&limit=10`).then(r => r.data).catch(() => []),
      Autos: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Accesorios para Autos')}`).then(r => r.data).catch(() => []),
      Celulares: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Accesorios para Celulares')}`).then(r => r.data).catch(() => []),
      Calzado: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Calzado')}`).then(r => r.data).catch(() => []),
      Mascotas: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Accesorios para Mascotas')}`).then(r => r.data).catch(() => []),
      JoyasAccesorios: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Joyas y Accesorios')}`).then(r => r.data).catch(() => []),
      Electronica: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Electrónica')}&limit=10`).then(r => r.data).catch(() => []),
      popularProducts: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10`).then(r => r.data).catch(() => []),
      popularBrands: await Get(`/${ctx?.locale}/brands/find/query?popular=true&limit=10`).then(r => r.data).catch(() => []),
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({}))
    }, // will be passed to the page component as props
  }
}