import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import HightLightsForm from '@/src/components/modules/admin/website/highlights'
import Get from '@/src/utils/hooks/get'

const HighLightPage = ({ website }) => {
    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={0} lg={3}>
                        <SideBar selected="highlight"/>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <HightLightsForm website={website}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default HighLightPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            website: await Get("website").then(r => r.data).catch(() => ({}))
        }
    }
}