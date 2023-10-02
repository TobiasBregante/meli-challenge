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

const Index = ({ website, popularProducts, ...categoryData }) => {
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

  const categoryList = [
    { title: "Tendencia", data: popularProducts, link: "/category/popular" },
    { title: "Auriculares", data: categoryData.Auriculares, link: "/category/Auriculares" },
    { title: "La previa es acá", data: categoryData.Bebidas, link: "/category/Bebidas" },
    { title: "Bazar", data: categoryData.Bazar, link: "/category/Bazar" },
    { title: "Juguetes", data: categoryData.Jugueteria, link: "/category/Juguetería" },
    { title: "Campamento", data: categoryData.Camping, link: "/category/Camping" },
    { title: "Servicios", data: categoryData.Servicios, link: "/category/Servicios" },
    { title: "Fitness", data: categoryData.Electronica, link: "/category/Fitness" },
    { title: "Cocina", data: categoryData.Cocina, link: "/category/Cocina" },
    { title: "Celulares", data: categoryData.Celulares, link: "/category/Celulares" },
    { title: "Gaming", data: categoryData.Informatica, link: "/category/Informática" },
    { title: "Gomas", data: categoryData.Gomas, link: "/category/Gomas" },
    { title: "Apple", data: categoryData.Apple, link: "/category/Apple" },
    { title: "Imágen y sonido", data: categoryData.ImagenYSonido, link: "/category/Imágen y sonido" },
    { title: "Climatización", data: categoryData.Climatizacion, link: "/category/Climatización" },
    { title: "Electrohogar", data: categoryData.Electrohogar, link: "/category/Electrohogar" },
    { title: "Cuidado personal", data: categoryData.CuidadoPersonal, link: "/category/Cuidado personal" },
    { title: "Electrodomésticos", data: categoryData.Electrodomesticos, link: "/category/Electrodomésticos" },
    { title: "Reciente", data: viewed }
  ]

  return (
    <Page categories={website?.categories}>
      <Container xl css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
        <HighLightCarousel data={website?.highlights} />
        <CategoriesCarousel data={website?.categories} />
        {categoryList.map((category, index) => (
          <ProductCarousel key={index} hiddeBannerSuscription={true} {...category} />
        ))}
      </Container>
    </Page>
  )
}

export default Index

export async function getServerSideProps(ctx) {
  const getCategoryData = async (category, locale) => {
    try {
      const response = await Get(`/${locale}/products/find/query?popular=true&category=${encodeURI(category)}&limit=10`);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const categories = [
    'Bebidas',
    'Camping',
    'Bazar',
    'Juguetería',
    'Auriculares',
    'Servicios',
    'Fitness',
    'Cocina',
    'Celulares',
    'Informática',
    'Gomas',
    'Apple',
    'Imágen y sonido',
    'Climatización',
    'Electrohogar',
    'Cuidado personal',
    'Electrodomésticos',
  ];

  const locale = ctx?.locale;

  const categoryDataPromises = categories.map((category) => getCategoryData(category, locale));

  const [
    Bebidas,
    Camping,
    Bazar,
    Jugueteria,
    Auriculares,
    Servicios,
    Fitness,
    Cocina,
    Celulares,
    Informatica,
    Gomas,
    Apple,
    ImagenYSonido,
    Climatizacion,
    Electrohogar,
    CuidadoPersonal,
    Electrodomesticos,
  ] = await Promise.all(categoryDataPromises);

  const popularProducts = await getCategoryData('', locale); // Obtener productos populares de todas las categorías
  const popularBrands = await Get(`/${locale}/brands/find/query?popular=true&limit=10`).then(r => r.data).catch(() => []);
  const website = await Get(`/${locale}/website`).then(r => r.data).catch(() => ({}));

  return {
    props: {
      Bebidas,
      Camping,
      Bazar,
      Jugueteria,
      Auriculares,
      Servicios,
      Fitness,
      Cocina,
      Celulares,
      Informatica,
      Gomas,
      Apple,
      ImagenYSonido,
      Climatizacion,
      Electrohogar,
      CuidadoPersonal,
      Electrodomesticos,
      popularProducts,
      popularBrands,
      website,
    },
  };
}