import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Season = ({ products, website }) => {
    return (
        <Page categories={website?.categories}>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website?.categories}/>
                <UnorderedList title="Temporada" data={products} />
            </Container>
        </Page>
    )
}

export default Season

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=false&premiunOnly=true&limit=200&isPublic=true&product_category=Artículo de Temporada").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => ({ }))
        }, // will be passed to the page component as props
    }
}