import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Smartphones = ({ products, website, equipamiento }) => {
    return (
        <Page categories={website?.categories} title='SaladaApp - Celulares'>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website?.categories}/>
                <UnorderedList title="Celulares" data={products} />
            </Container>
        </Page>
    )
}

export default Smartphones

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=false&premiunOnly=true&limit=200&isPublic=true&product_category=Accesorios para Celulares").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}