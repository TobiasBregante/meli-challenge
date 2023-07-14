import Page from '@Page'
import Get from '@/src/utils/hooks/get'
import { Container, Grid } from '@nextui-org/react'
import UpdateUserInfoModule from "@/src/components/modules/user/update/info";
import SideBar from '@/src/components/modules/admin/sidebar';

const UpdateUser = ({ data }) => {

  return (
    <Page>
      <Container fluid>
        <Grid.Container gap={2}>
          <Grid xs={12} md={3} >
            <SideBar selected="searchByEmail" />
          </Grid>
          <Grid xs={12} md={9} >
            <UpdateUserInfoModule data={data} />
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
      data: await Get(`/${ctx?.locale}/user/${ctx.params._id}`).then(r => r.data).catch(() => ({})),
    }, // will be passed to the page component as props
  }
}