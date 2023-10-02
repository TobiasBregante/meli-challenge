import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import { Container } from '@nextui-org/react'
import Get from '@/utils/hooks/get'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SelectCountry from '@/src/components/modules/selectCountry'
import ViewedProducts from '@/src/utils/product/viewedProducts'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'

const Index = ({
  website,
  popularProducts,
  Auriculares,
  Bazar,
  Electronica,
  Jugueteria,
  Camping,
  Servicios,
  Bebidas,
  Cocina,
  Celulares,
  Informatica,
  Gomas,
  Apple,
  ImagenYSonido,
  Climatizacion,
  Electrohogar,
  CuidadoPersonal,
  Electrodomesticos }) => {
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
        <CategoriesCarousel data={website?.categories} />
        <ProductCarousel hiddeBannerSuscription={true} title="Tendencia" data={popularProducts} link="/category/popular" />
        <ProductCarousel hiddeBannerSuscription={true} title="Auriculares" data={Auriculares} link="/category/Auriculares" />
        <ProductCarousel hiddeBannerSuscription={true} title="La previa es acá" data={Bebidas} link="/category/Bebidas" />
        <ProductCarousel hiddeBannerSuscription={true} title="Bazar" data={Bazar} link="/category/Bazar" />
        <ProductCarousel hiddeBannerSuscription={true} title="Juguetes" data={Jugueteria} link="/category/Juguetería" />
        <ProductCarousel hiddeBannerSuscription={true} title="Campamento" data={Camping} link="/category/Camping" />
        <ProductCarousel hiddeBannerSuscription={true} title="Servicios" data={Servicios} link="/category/Servicios" />
        <ProductCarousel hiddeBannerSuscription={true} title="Fitness" data={Electronica} link="/category/Fitness" />
        <ProductCarousel hiddeBannerSuscription={true} title="Cocina" data={Cocina} link="/category/Cocina" />
        <ProductCarousel hiddeBannerSuscription={true} title="Celulares" data={Celulares} link="/category/Celulares" />
        <ProductCarousel hiddeBannerSuscription={true} title="Gaming" data={Informatica} link="/category/Informática" />
        <ProductCarousel hiddeBannerSuscription={true} title="Gomas" data={Gomas} link="/category/Gomas" />
        <ProductCarousel hiddeBannerSuscription={true} title="Apple" data={Apple} link="/category/Apple" />
        <ProductCarousel hiddeBannerSuscription={true} title="Imágen y sonido" data={ImagenYSonido} link="/category/Imágen y sonido" />
        <ProductCarousel hiddeBannerSuscription={true} title="Climatización" data={Climatizacion} link="/category/Climatización" />
        <ProductCarousel hiddeBannerSuscription={true} title="Electrohogar" data={Electrohogar} link="/category/Electrohogar" />
        <ProductCarousel hiddeBannerSuscription={true} title="Cuidado personal" data={CuidadoPersonal} link="/category/Cuidado personal" />
        <ProductCarousel hiddeBannerSuscription={true} title="Electrodomésticos" data={Electrodomesticos} link="/category/Electrodomésticos" />
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
      Cocina: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Cocina')}&limit=10`).then(r => r.data).catch(() => []),
      Celulares: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Celulares')}&limit=10`).then(r => r.data).catch(() => []),
      Informatica: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Informática')}&limit=10`).then(r => r.data).catch(() => []),
      Gomas: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Gomas')}&limit=10`).then(r => r.data).catch(() => []),
      Apple: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Apple')}&limit=10`).then(r => r.data).catch(() => []),
      ImagenYSonido: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Imágen y sonido')}&limit=10`).then(r => r.data).catch(() => []),
      Climatizacion: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Climatización')}&limit=10`).then(r => r.data).catch(() => []),
      Electrohogar: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Electrohogar')}&limit=10`).then(r => r.data).catch(() => []),
      CuidadoPersonal: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Cuidado personal')}&limit=10`).then(r => r.data).catch(() => []),
      Electrodomesticos: await Get(`/${ctx?.locale}/products/find/query?popular=true&category=${encodeURI('Electrodomésticos')}&limit=10`).then(r => r.data).catch(() => []),
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({})),
    }, // will be passed to the page component as props
  }
}
