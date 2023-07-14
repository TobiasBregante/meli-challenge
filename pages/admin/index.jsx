import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'

const SearchByPhonePage = ({ data }) => {
    return (
        <Page>
            <Container xl css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3} >
                        <SideBar selected="inicio"/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default SearchByPhonePage

export async function getServerSideProps(ctx) {

    return {
        props: {}
    }
}