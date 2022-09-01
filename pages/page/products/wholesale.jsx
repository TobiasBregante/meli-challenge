import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Wholesale = ({ products, brands, website }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                <BrandCarousel title="Marcas mas populares en venta pormayor" data={brands} />
                <UnorderedList title="Productos venta por mayor" data={products} />
            </Container>
        </Page>
    )
}

export default Wholesale

export async function getServerSideProps(ctx) {

    return {
        props: {
            brands: await Get("brands/find/query?popular=true&isWholesaleAndRetail=false&limit=100").then(r => r.data).catch(() => []),
            products: await Get("products/find/query?popular=true&isWholesaleAndRetail=false&limit=100").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}