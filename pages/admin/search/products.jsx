import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchProductModule from '@/src/components/modules/search/products'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'
import ShouldLogin from '@/src/components/modules/user/errors/shouldLogin'
import { useUserContext } from '@/src/utils/user/provider'

const SearchByBrandsComponent = ({ data }) => {
    const user = useUserContext()

    if (!user) {
        return (
            <Container xl css={{ mb: "$10" }}>
                <ShouldLogin />
            </Container>
        )
    }

    return (
        <Container xl css={{ mb: "$10" }}>
            <Grid.Container gap={2}>
                <Grid xs={12} md={3}  >
                    <SideBar selected="products" />
                </Grid>
                <Grid xs={12} md={9}>
                    <SearchProductModule data={data} />
                </Grid>
            </Grid.Container>
        </Container>
    )
}

const SearchByBrandsPage = ({ data }) => {
    return (
        <Page>
            <SearchByBrandsComponent data={data}/>
        </Page>
    )
}

export default SearchByBrandsPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=1000`).then(r => r.data).catch(() => [])
        }
    }
}

