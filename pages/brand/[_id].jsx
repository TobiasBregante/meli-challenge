import Page from '@Page'
import BrandProfileModule from '@/src/components/modules/brand/profile/index'
import Get from '@/src/utils/hooks/get'
import { Container } from '@nextui-org/react'
import BrandNotFound from '@/src/components/modules/brand/notFound'

const BrandPage = ({ data }) => {

  if (data.msg) {
    return (
      <Page title={data.msg == "Pausado" ? "Marca pausada" : "Marca no encontrada"}>
        <Container lg>
          <BrandNotFound isPaused={data.msg === "Pausado"} />
        </Container>
      </Page>
    )
  }

  return (
    <Page title={`${data.brandName} - SaladaApp`}>
      <Container lg>
        <BrandProfileModule data={data} />
      </Container>
    </Page>
  )
}

export default BrandPage

export async function getServerSideProps(ctx) {

  return {
    props: {
      data: await Get(`/${ctx?.locale}/brands/brand/${ctx.params._id}?withProducts=true`).then(r => r.data).catch(err => err.response.data),
    }, // will be passed to the page component as props
  }
}