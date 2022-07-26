import Page from '@Page'
import ProductModule from '@/src/components/modules/products/view'
import productsData from '@/utils/sampleProducts'
import { Container } from '@nextui-org/react';

const ProductPage = ({ data }) => {

  return (
    <Page>
      <Container lg>
        <ProductModule data={data} />
      </Container>
    </Page>
  )
}

export default ProductPage

export async function getServerSideProps(ctx) {

  return {
    props: {
      data: productsData(1)[0],
    }, // will be passed to the page component as props
  }
}