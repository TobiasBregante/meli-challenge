import Page from '@Page'
import Get from '@/src/utils/hooks/get'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar';
import UpdateBrandModule from '@/src/components/modules/brand/update';

const UpdateUser = ({ data, website }) => {

  return (
    <Page>
      <Container fluid>
        <Grid.Container gap={2}>
          <Grid xs={12} md={3} >
            <SideBar selected="brands" />
          </Grid>
          <Grid xs={12} md={9}>
            <UpdateBrandModule data={data} website={website} />
          </Grid>
        </Grid.Container>

      </Container>
    </Page>
  )
}

export default UpdateUser

export async function getServerSideProps(ctx) {

  const brandData = await Get(`/${ctx?.locale}/brands/brand/${ctx.params._id}?byPass=true`).then(r => r.data).catch(() => ({}))
  brandData.ownerData = await Get(`/${ctx?.locale}/user/${brandData.isOwnedBy}`).then(r => r.data).catch(() => ({}))

  return {
    props: {
      data: brandData,
      website: await Get("/website").then(r => r.data).catch(() => ({}))
    }, // will be passed to the page component as props
  }
}