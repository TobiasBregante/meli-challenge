import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Season = ({ products, website }) => {
    return (
        <Page categories={website?.categories} title='SaladaApp - Indumentaria'>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website?.categories}/>
                <UnorderedList title="Indumentaria" data={products} />
            </Container>
        </Page>
    )
}

export default Season

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get(`/${ctx?.locale}/products/find/query?limit=200&product_category=Ropa Informal`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({ }))
        }, // will be passed to the page component as props
    }
}