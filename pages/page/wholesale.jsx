import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import productsData from '@/utils/sampleProducts'
import { Container } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import storesData from '@/src/utils/sampleStores'
import UnorderedList from '@/src/components/modules/products/list/unordered'

const Index = ({ products, stores }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel />
                <BrandCarousel title="Marcas mas populares en venta por menor y mayor" data={stores} />
                <UnorderedList title="Productos venta por menor y mayor" data={products} />
            </Container>
        </Page>
    )
}

export default Index

export async function getServerSideProps(ctx) {

    return {
        props: {
            stores: storesData(),
            products: productsData(30),
        }, // will be passed to the page component as props
    }
}