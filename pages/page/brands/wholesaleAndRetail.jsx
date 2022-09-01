import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import BrandList from '@/src/components/modules/brand/lists/index'
import Get from '@/src/utils/hooks/get'

const WholesaleAndRetailBrands = ({ brands, website }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                <BrandList title="Marcas mas populares en venta por mayor y menor" data={brands} />
            </Container>
        </Page>
    )
}

export default WholesaleAndRetailBrands

export async function getServerSideProps(ctx) {

    return {
        props: {
            brands: await Get("brands/find/query?popular=true&isWholesaleAndRetail=true&limit=100").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}