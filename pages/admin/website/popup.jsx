import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import PopupForm from '@/src/components/modules/admin/website/popupForm'
import Get from '@/src/utils/hooks/get'

const PopUpPage = ({ website }) => {
    return (
        <Page>
            <Container lg css={{ mb: "$10" }}>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3}>
                        <SideBar selected="PopUp"/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <PopupForm website={website}/>
                    </Grid>
                </Grid.Container>
                
            </Container>
        </Page>
    )
}

export default PopUpPage

export async function getServerSideProps(ctx) {

    return {
        props: {
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({}))
        }
    }
}