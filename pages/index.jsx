import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import { Badge, Button, Card, Col, Container, Grid, Text } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import AdsModals from '@/src/components/modules/products/ads/modals'
import Get from '@/utils/hooks/get'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SelectCountry from '@/src/components/modules/selectCountry'
import ViewedProducts from '@/src/utils/product/viewedProducts'
import BannerSuscriber from '@/src/components/bannerSuscriber'

const Index = ({ website, popularProducts, popularBrands, Celulares, Autos, RopaInformal, JoyasAccesorios, Mascotas, Electronica, Calzado, Jugueteria, Hogar }) => {
  const router = useRouter()
  const [toCountryPage, setToCountryPage] = useState(false)
  const [viewed, setViewed] = useState([])
  const itemsSuscriber = [
    { content: <>Promocionate y llegá a tu audiencia <Badge className='badgePrice'>Registrate ahora</Badge></>, className: 'ads-card-audience adsBg1' },
    { content: <>Creá tu marca y comenzá a publicar <Badge className='badgePrice'>Comencemos</Badge></>, className: 'ads-card-audience adsBg3' },
  ]
  
  useEffect(() => {
    if (ViewedProducts()?.length > 0) {
      setViewed(ViewedProducts())
    }
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
      <Container xl css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
        {/* <AdsModals img={website?.popup?.img} link={website?.popup?.link}/> */}
        {/* <HighLightCarousel data={website.highlights} /> */}
        {/* <BannerSuscriber items={itemsSuscriber}/> */}
        <ProductCarousel hiddeBannerSuscription={true} title="Para el hogar" data={Hogar} />
        <ProductCarousel hiddeBannerSuscription={true} title="Reciente" data={viewed} />
        <ProductCarousel hiddeBannerSuscription={true} title="Tendencia" data={popularProducts} link="/category/popular" />
        <ProductCarousel hiddeBannerSuscription={true} title="Entretenimiento" data={Jugueteria} link="/category/Juguetería" />
        <ProductCarousel hiddeBannerSuscription={true} title="Calzado" data={Calzado} link="/category/Calzado" />
        <ProductCarousel hiddeBannerSuscription={true} title="Indumentaria" data={RopaInformal} link="/category/Ropa Informal" />
        <ProductCarousel hiddeBannerSuscription={true} title="Electrónica" data={Electronica} link="/category/Electrónica" />
        {/* <BrandCarousel title="Marcas en tendencia" data={popularBrands} /> */}
        <ProductCarousel hiddeBannerSuscription={true} title={`Joyas & Accesorios`} data={JoyasAccesorios} link="/category/Joyas y Accesorios" />
        <ProductCarousel hiddeBannerSuscription={true} title="Mascotas" data={Mascotas} link="/category/Accesorios para Mascotas" />
        <ProductCarousel hiddeBannerSuscription={true} title="Celulares" data={Celulares} link="/category/Accesorios para Celulares" />
        <ProductCarousel hiddeBannerSuscription={true} title="Autos" data={Autos} link="/category/Accesorios para Autos" />
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  return {
    props: {
      Hogar: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Artículos para el Hogar')}&limit=10`).then(r => r.data).catch(() => []),
      RopaInformal: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Ropa Informal')}&limit=10`).then(r => r.data).catch(() => []),
      Autos: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Accesorios para Autos')}`).then(r => r.data).catch(() => []),
      Jugueteria: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Juguetería')}`).then(r => r.data).catch(() => []),
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