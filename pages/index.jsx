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



  const categoryList = [
    { title: "Tendencia", data: popularProducts, link: "/category/popular" },
    { title: "Celulares", data: categoryData?.Celulares, link: "/category/Celulares" },
    { title: "Ropa de mujer", data: categoryData?.RopaDeMujer, link: "/category/Ropa de mujer" },
    { title: "Ropa de hombre", data: categoryData?.RopaDeHombre, link: "/category/Ropa de hombre" },
    { title: "Electrodomésticos", data: categoryData?.Electrodomesticos, link: "/category/Electrodomésticos" },
    { title: "Auriculares", data: categoryData?.Auriculares, link: "/category/Auriculares" },
    { title: "Gaming", data: categoryData?.Informatica, link: "/category/Informática" },
    { title: "Apple", data: categoryData?.Apple, link: "/category/Apple" },
    { title: "Imágen y sonido", data: categoryData?.ImagenYSonido, link: "/category/Imágen y sonido" },
    { title: "Cocina", data: categoryData?.Cocina, link: "/category/Cocina" },
    { title: "Cuidado personal", data: categoryData?.CuidadoPersonal, link: "/category/Cuidado personal" },
    { title: "Calzado", data: categoryData?.Calzado, link: "/category/Calzado" },
    { title: "Accesorios", data: categoryData?.Accesorios, link: "/category/Accesorios" },
    { title: "Frescos", data: categoryData?.Frescos, link: "/category/Frescos" },
    { title: "Refrigerados", data: categoryData?.Refrigerados, link: "/category/Refrigerados" },
    { title: "Congelados", data: categoryData?.Congelados, link: "/category/Congelados" },
    { title: "Envasados", data: categoryData?.Envasados, link: "/category/Envasados" },
    { title: "No Perecederos", data: categoryData?.NoPerecederos, link: "/category/No perecederos" },
    { title: "La previa es acá", data: categoryData?.Bebidas, link: "/category/Bebidas" },
    { title: "Bazar", data: categoryData?.Bazar, link: "/category/Bazar" },
    { title: "Juguetes", data: categoryData?.Jugueteria, link: "/category/Juguetería" },
    { title: "Campamento", data: categoryData?.Camping, link: "/category/Camping" },
    { title: "Servicios", data: categoryData?.Servicios, link: "/category/Servicios" },
    { title: "Fitness", data: categoryData?.Electronica, link: "/category/Fitness" },
    { title: "Cubiertas", data: categoryData?.Cubiertas, link: "/category/Cubiertas" },
    { title: "Imagen y sonido", data: categoryData?.ImagenYSonido, link: "/category/Imágen y sonido" },
    { title: "Climatización", data: categoryData?.Climatizacion, link: "/category/Climatización" },
    { title: "Electrohogar", data: categoryData?.Electrohogar, link: "/category/Electrohogar" },
    { title: "Ropa infantil", data: categoryData?.RopaInfantil, link: "/category/Ropa de mujer" },
    { title: "Ropa para bebés", data: categoryData?.RopaDeBebes, link: "/category/Ropa para bebés" },
    { title: "Reciente", data: viewed }
  ]

  if (toCountryPage) {
    return <SelectCountry />
  }

  return (
    <Page categories={website?.categories}>
      <Container xl css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
        <HighLightCarousel data={website?.highlights} />
        <CategoriesCarousel data={website?.categories} />
        {Object.keys(categoryData)?.length > 0 && categoryList?.map((category, index) => (
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
    'Cubiertas',
    'Apple',
    'Imágen y sonido',
    'Climatización',
    'Electrohogar',
    'Cuidado personal',
    'Electrodomésticos',
    'Ropa de mujer',
    'Ropa de hombre',
    'Ropa infantil',
    'Ropa para bebés',
    'Calzado',
    'Accesorios',
    'Frescos',
    'Refrigerados',
    'Congelados',
    'Envasados',
    'No perecederos',
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
    Cubiertas,
    Apple,
    ImagenYSonido,
    Climatizacion,
    Electrohogar,
    CuidadoPersonal,
    Electrodomesticos,
    RopaDeMujer,
    RopaDeHombre,
    RopaInfantil,
    RopaDeBebes,
    Calzado,
    Accesorios,
    Frescos,
    Refrigerados,
    Congelados,
    Envasados,
    NoPerecederos,
  ] = await Promise.all(categoryDataPromises);

  const popularProducts = await getCategoryData('', locale); // Obtener productos populares de todas las categorías
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
      Cubiertas,
      Apple,
      ImagenYSonido,
      Climatizacion,
      Electrohogar,
      CuidadoPersonal,
      Electrodomesticos,
      popularProducts,
      website,
      RopaDeMujer,
      RopaDeHombre,
      RopaInfantil,
      RopaDeBebes,
      Calzado,
      Accesorios,
      Frescos,
      Refrigerados,
      Congelados,
      Envasados,
      NoPerecederos,
    },
  };
}