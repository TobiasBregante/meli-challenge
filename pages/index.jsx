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
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'

const Index = ({ website, popularProducts, Auriculares, Bazar, Electronica, Jugueteria, Camping, Servicios, Bebidas }) => {
  const router = useRouter()
  const [toCountryPage, setToCountryPage] = useState(false)
  const [viewed, setViewed] = useState([])

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
        <HighLightCarousel data={website?.highlights} />

        {/* Categorías más populares */}
        <CategoriesCarousel data={website?.categories} />
        <ProductCarousel hiddeBannerSuscription={true} title="Tendencia" data={popularProducts} link="/category/popular" />
        <ProductCarousel hiddeBannerSuscription={true} title="Auriculares" data={Auriculares} link="/category/Auriculares" />
        <ProductCarousel hiddeBannerSuscription={true} title="La previa es acá" data={Bebidas} link="/category/Bebidas" />

        {/* Categorías menos populares */}
        <ProductCarousel hiddeBannerSuscription={true} title="Bazar" data={Bazar} link="/category/Bazar" />
        <ProductCarousel hiddeBannerSuscription={true} title="Juguetes" data={Jugueteria} link="/category/Juguetería" />
        <ProductCarousel hiddeBannerSuscription={true} title="Campamento" data={Camping} link="/category/Camping" />
        <ProductCarousel hiddeBannerSuscription={true} title="Servicios" data={Servicios} link="/category/Servicios" />
        <ProductCarousel hiddeBannerSuscription={true} title="Fitness" data={Electronica} link="/category/Fitness" />

        {/* Otros */}
        <ProductCarousel hiddeBannerSuscription={true} title="Reciente" data={viewed} />

      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  return {
    props: {
      Bebidas: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Bebidas')}&limit=10`).then(r => r.data).catch(() => []),
      Camping: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Camping')}&limit=10`).then(r => r.data).catch(() => []),
      Bazar: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Bazar')}&limit=10`).then(r => r.data).catch(() => []),
      Jugueteria: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Juguetería')}`).then(r => r.data).catch(() => []),
      Auriculares: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Auriculares')}`).then(r => r.data).catch(() => []),
      popularProducts: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10`).then(r => r.data).catch(() => []),
      popularBrands: await Get(`/${ctx?.locale}/brands/find/query?popular=true&limit=10`).then(r => r.data).catch(() => []),
      Servicios: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Servicios')}&limit=10`).then(r => r?.data).catch(() => []),
      Fitness: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=10&product_category=${encodeURI('Fitness')}`).then(r => r?.data).catch(() => []),
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({})),
    }, // will be passed to the page component as props
  }
}