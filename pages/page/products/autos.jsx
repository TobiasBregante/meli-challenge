import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Cars = ({ products, website }) => {
    return (
        <Page categories={website?.categories} title='SaladaApp - Autos'>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website?.categories}/>
                <UnorderedList title="Autos" data={products} />
            </Container>
        </Page>
    )
}

export default Cars

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=200&&product_category=Accesorios para Autos`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}