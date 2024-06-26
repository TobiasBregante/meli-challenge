import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SearchProductModule from '@/src/components/modules/search/products'
import Get from '@/src/utils/hooks/get'

const SearchByBrandsPage = ({ data }) => {
    return (
        <Page>
            <Container xl css={{ mb: "$10" }}>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={9}>
                        <SearchProductModule data={data} isSeller={true}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default SearchByBrandsPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=1000&brand_id=${ctx.query.brand}`).then(r => r.data).catch(() => [])
        }
    }
}

