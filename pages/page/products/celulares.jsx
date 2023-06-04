import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Buy = ({ products, website, equipamiento }) => {
    return (
        <Page categories={website?.categories}>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website?.categories}/>
                <UnorderedList title="Compra" data={products} />
                <UnorderedList title="Equipamiento" showSeeMore={true} data={equipamiento} link={'/page/products/equipamiento'}/>
            </Container>
        </Page>
    )
}

export default Buy

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=false&premiunOnly=true&limit=200&isPublic=true&product_category=Compra").then(r => r.data).catch(() => []),
            equipamiento: await Get("products/find/query?popular=false&premiunOnly=true&limit=200&isPublic=true&product_category=Equipamiento").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}