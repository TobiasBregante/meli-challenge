import Page from '@Page'
import ProductModule from '@/src/components/modules/products/view'
import { Container } from '@nextui-org/react';
import Get from '@/src/utils/hooks/get';

const ProductPage = ({ data, relateds, brandProducts }) => {

  return (
    <Page>
      <Container lg css={{ mt: "$10" }}>
        <ProductModule data={data} relateds={relateds} brandProducts={brandProducts}/>
      </Container>
    </Page>
  )
}

export default ProductPage

export async function getServerSideProps(ctx) {
  const data = await Get(`products/product/${ctx.params._id}?withBrand=true`).then(r=>r.data).catch(()=>({}))
  
  return {
    props: {
      data: data,
      relateds: await Get(`products/find/query?category=${data.category}&limit=10`).then(r=>r.data).catch(()=>({})),
      brandProducts: await Get(`products/find/query?brand_id=${data.brand_id}&limit=10`).then(r=>r.data).catch(()=>({}))
    }, // will be passed to the page component as props
  }
}