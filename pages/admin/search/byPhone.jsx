import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByPhoneModule from '@/src/components/modules/search/byPhone'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByPhonePage = ({ data }) => {
    const [state, setState] = useState(data)

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={3} sm={3} lg={3}>
                        <SideBar selected="searchByPhone" />
                    </Grid>
                    <Grid sm={9} lg={9}>
                        <SearchByPhoneModule data={data} state={state} setState={setState} />
                    </Grid>
                </Grid.Container>

            </Container>
        </Page>
    )
}

export default SearchByPhonePage

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: await Get("user/find?limit=100000").then(r => r.data).catch(() => [])
        }
    }
}