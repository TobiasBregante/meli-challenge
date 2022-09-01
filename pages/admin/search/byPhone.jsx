import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByPhoneModule from '@/src/components/modules/search/byPhone'
import sampleUsers from '@/utils/sampleUsers'
import { useState } from 'react'

const SearchByPhonePage = ({ data }) => {
    const [state,setState] = useState(data)

    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={0} lg={3}>
                        <SideBar selected="searchByPhone"/>
                    </Grid>
                    <Grid lg={9}>
                        <SearchByPhoneModule data={data} state={state} setState={setState}/>
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
            data: sampleUsers()
        }
    }
}