import Page from '@Page'
import Get from '@/src/utils/hooks/get'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar';
import UpdateBrandModule from '@/src/components/modules/brand/update';

const UpdateUser = ({ data, website }) => {

  return (
    <Page>
      <Container lg >
        <Grid.Container gap={2}>
          <Grid xs={0} md={3} >
            <SideBar selected="brands" />
          </Grid>
          <Grid sm={9} lg={9}>
            <UpdateBrandModule data={data} website={website} />
          </Grid>
        </Grid.Container>

      </Container>
    </Page>
  )
}

export default UpdateUser

export async function getServerSideProps(ctx) {

  return {
    props: {
      data: await Get(`brands/brand/${ctx.params._id}?byPass=true`).then(r => r.data).catch(() => ({})),
      website: await Get("website").then(r => r.data).catch(() => ({}))
    }, // will be passed to the page component as props
  }
}