import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByStreetModule from '@/src/components/modules/search/byStreet'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByStreetPage = ({ data }) => {

    // console.log("SbyS Data-> ", data)

    const [state,setState] = useState(data)

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3} >
                        <SideBar selected="searchByStreet"/>
                    </Grid>
                    <Grid xs={12} md={9}>
                        <SearchByStreetModule data={data} state={state} setState={setState}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default SearchByStreetPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get("brands/find/query?getAll=true").then(r => r.data).catch(() => [])
        }
    }
}