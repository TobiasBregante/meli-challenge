import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByEmailModule from '@/src/components/modules/search/byEmail'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByEmailPage = ({ data }) => {
    const [state,setState] = useState(data)

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={3}  >
                        <SideBar selected="searchByEmail"/>
                    </Grid>
                    <Grid xs={9}>
                        <SearchByEmailModule data={data} state={state} setState={setState}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default SearchByEmailPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get("user/find?limit=100000").then(r => r.data).catch(() => [])
        }
    }
}