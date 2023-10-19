import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'
import useSWRInfinite from 'swr/infinite'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'




const ProductsByCategory = ({ products, brands, website, category }) => {
    const router = useRouter()
    const [uniqueProds, setUniqueProds] = useState([]);
    const categoryParam = router.query.category;
    const baseUrl = `/${router.locale}/products/find/query?popular=true&limit=21`;
    const endpoint = encodeURI(categoryParam).toLowerCase() === 'popular'
        ? baseUrl
        : `${baseUrl}&category=${encodeURI(categoryParam)}`;



    const fetchProducts = async ({ pageIndex, previousPageData }) => {
        pageIndex = pageIndex + 1;
        if (previousPageData && !previousPageData.length) return;

        try {
            const response = await Get(`${endpoint}&page=${size}`);
            const newProducts = response.data;


            const filteredProducts = newProducts.filter((newProduct) => {
                return !uniqueProds.some((uniqueProduct) => uniqueProduct._id === newProduct._id);
            });


            setUniqueProds([...uniqueProds, ...filteredProducts]);

            return newProducts;
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    };




    const { data: prods, size, setSize, error } = useSWRInfinite(
        (size) =>
            `${endpoint}&page=${size + 1}`,
        fetchProducts
    );

    const paginatedProds = prods?.flat()


    const isReachedEnd = prods && prods[prods.length - 1] < 21



    return (
        <Page categories={website?.categories}>
            <Container xl css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories} />
                {
                    products?.length > 0 &&
                    <InfiniteScroll
                        next={() => setSize(size + 1)}
                        hasMore={!isReachedEnd}
                        css={{ m: 0 , p: 0, w: '100vw' }}
                        loader={<div style={{ marginTop: '1rem', margin: 0, width: '100%' }}><span >Cargando</span></div>}
                        endMessage={<p style={{ textAlign: 'center', margin: 0, width: '100%' }}><b>Llegaste al final</b></p>}
                        dataLength={paginatedProds?.length ?? 0}>
                        <UnorderedList title={`Más Populares`} data={paginatedProds} />
                    </InfiniteScroll>

                }
            </Container>
        </Page>
    )
}

export default ProductsByCategory

export async function getServerSideProps(ctx) {

    return {
        props: {
            brands: await Get(`/${ctx?.locale}/brands/find/query?popular=true&limit=20${encodeURI(ctx.params.category)?.toLowerCase() !== 'popular' ? `&category=${encodeURI(ctx.params.category)}` : ''}`).then(r => r.data).catch(() => []),
            products: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=21${encodeURI(ctx.params.category)?.toLowerCase() !== 'popular' ? `&category=${encodeURI(ctx.params.category)}` : ''}`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => { }),
            category: ctx?.params?.category
        }, // will be passed to the page component as props
    }
}