import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const ProductsByCategory = ({ products, brands, website, category }) => {
    return (
        <Page categories={website?.categories}>
            <Container xl css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                {
                    products?.length > 0 && <UnorderedList title={`Más Populares`} data={products} />
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
            products: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=200${encodeURI(ctx.params.category)?.toLowerCase() !== 'popular' ? `&category=${encodeURI(ctx.params.category)}` : ''}`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => {}),
            category: ctx?.params?.category
        }, // will be passed to the page component as props
    }
}