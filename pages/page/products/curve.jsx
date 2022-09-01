import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'

const Curve = ({ products, }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <UnorderedList title="Productos venta por curva" data={products} />
            </Container>
        </Page>
    )
}

export default Curve

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=true&perCurve=true&limit=100").then(r => r.data).catch(() => []),
           
        }, // will be passed to the page component as props
    }
}