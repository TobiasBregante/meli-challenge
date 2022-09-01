import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Popular = ({ products,  website }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                <UnorderedList title="Productos mas populares" data={products} />
            </Container>
        </Page>
    )
}

export default Popular

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=true&isWholesaleAndRetail=false&limit=200").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}