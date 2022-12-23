import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByZoneModule from '@/src/components/modules/search/byZone'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByZonePage = ({ data }) => {

    const [state,setState] = useState(data)

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3} >
                        <SideBar selected="searchByZone"/>
                    </Grid>
                    <Grid xs={12} md={9}>
                        <SearchByZoneModule data={data} state={state} setState={setState}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default SearchByZonePage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get("brands/find/query?getAll=true").then(r => r.data).catch(() => [])
        }
    }
}