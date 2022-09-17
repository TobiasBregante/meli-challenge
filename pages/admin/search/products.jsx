import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchProductModule from '@/src/components/modules/search/products'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByBrandsPage = ({ data }) => {
    

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={3}  >
                        <SideBar selected="products"/>
                    </Grid>
                    <Grid xs={9}>
                        <SearchProductModule data={data} />
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
            data: await Get("products/find/query?limit=1000").then(r => r.data).catch(() => [])
        }
    }
}

