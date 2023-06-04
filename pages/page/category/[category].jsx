import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Wholesale = ({ products, brands, website, category }) => {
    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                {
                    brands?.length > 0 && <BrandCarousel title={`Marcas de la categoria ${category}`} data={brands} />
                }
                {
                    products?.length > 0 && <UnorderedList title={`Productos de la categoria ${category}`} data={products} />
                }
                {
                    
                }
            </Container>
        </Page>
    )
}

export default Wholesale

export async function getServerSideProps(ctx) {

    return {
        props: {
            brands: await Get(`brands/find/query?popular=true&category=${ctx.params.category}&limit=20`).then(r => r.data).catch(() => []),
            products: await Get(`products/find/query?popular=true&category=${ctx.params.category}&limit=100`).then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { }),
            category: ctx.params.category
        }, // will be passed to the page component as props
    }
}