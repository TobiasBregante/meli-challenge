import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchBrandModule from '@/src/components/modules/search/brands'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'

const SearchByBrandsPage = ({ data }) => {
    const [state,setState] = useState(data)

    return (
        <Page>
            <Container fluid css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3} >
                        <SideBar selected="brand"/>
                    </Grid>
                    <Grid xs={12} md={9}>
                        <SearchBrandModule data={data} state={state} setState={setState}/>
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
            data: await Get(`/${ctx?.locale}/brands/find/query?getAll=true`).then(r => r.data).catch(() => [])
        }
    }
}

