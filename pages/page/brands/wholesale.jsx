import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import Get from '@/src/utils/hooks/get'
import BrandsList from '@/src/components/modules/brand/lists'

const WholesaleBrands = ({ products, brands, website }) => {

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                <BrandsList title="Marcas en venta por mayor" data={brands} />
            </Container>
        </Page>
    )
}

export default WholesaleBrands

export async function getServerSideProps(ctx) {

    return {
        props: {
            brands: await Get("brands/find/query?popular=true&isWholesaleAndRetail=false&limit=100").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}