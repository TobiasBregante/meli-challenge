import Page from '@Page'
import BrandProfileModule from '@/src/components/modules/brand/profile/index'
import Get from '@/src/utils/hooks/get'
import { Container } from '@nextui-org/react'

const BrandPage = ({data}) => {
  
  return (
    <Page>
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
      data: await Get(`brands/brand/${ctx.params._id}?withProducts=true`).then(r=>r.data).catch(()=>({})),
    }, // will be passed to the page component as props
  }
}