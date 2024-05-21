import Page from '@Page';
import ProductCarousel from '@/src/components/modules/products/carouseles/product';
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight';
import { Container } from '@nextui-org/react';
import Get from '@/utils/hooks/get';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import SelectCountry from '@/src/components/modules/selectCountry';
import ViewedProducts from '@/src/utils/product/viewedProducts';
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories';

const Index = ({ website, popularProducts, ...categoryData }) => {
  const router = useRouter();
  const [toCountryPage, setToCountryPage] = useState(false);
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const viewedProducts = ViewedProducts();
    if (viewedProducts?.length > 0) {
      setViewed(viewedProducts);
    }
    if (typeof window !== 'undefined' && window.location.pathname.replaceAll('/', '') !== router.locale) {
      setToCountryPage(true);
    } else {
      setToCountryPage(false);
    }
  }, [router.locale]);

  const categoryList = useMemo(() => [
    { title: "Tendencia", data: popularProducts, link: "/category/popular" },
    { title: "Ropa de mujer", data: categoryData?.RopaDeMujer, link: "/category/Ropa de mujer" },
    { title: "Ropa de hombre", data: categoryData?.RopaDeHombre, link: "/category/Ropa de hombre" },
    { title: "Calzado", data: categoryData?.Calzado, link: "/category/Calzado" },
    { title: "Accesorios", data: categoryData?.Accesorios, link: "/category/Accesorios" },
    { title: "Ropa infantil", data: categoryData?.RopaInfantil, link: "/category/Ropa de mujer" },
    { title: "Ropa para bebés", data: categoryData?.RopaDeBebes, link: "/category/Ropa para bebés" },
    { title: "Reciente", data: viewed }
  ], [popularProducts, categoryData, viewed]);

  if (toCountryPage) {
    return <SelectCountry />;
  }

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
  );
};

export default Index;

export async function getServerSideProps(ctx) {
  const fetchCategoryData = async (category, locale) => {
    const url = `/${locale}/products/find/query?popular=true&category=${encodeURI(category)}&limit=10`;
    try {
      const response = await Get(url);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const categories = [
    'Ropa de mujer',
    'Ropa de hombre',
    'Ropa infantil',
    'Ropa para bebés',
    'Calzado',
    'Accesorios',
  ];

  const locale = ctx?.locale;
  const categoryDataPromises = categories.map((category) => fetchCategoryData(category, locale));

  const [popularProducts, ...categoryData] = await Promise.all([
    fetchCategoryData('', locale),
    ...categoryDataPromises
  ]);

  const [RopaDeMujer, RopaDeHombre, RopaInfantil, RopaDeBebes, Calzado, Accesorios] = categoryData;
  const website = await Get(`/${locale}/website`).then(r => r.data).catch(() => ({}));

  return {
    props: {
      popularProducts,
      website,
      RopaDeMujer,
      RopaDeHombre,
      RopaInfantil,
      RopaDeBebes,
      Calzado,
      Accesorios,
    },
  };
}
