import Page from '@Page'
import SearchModule from '@/src/components/modules/search'
import { Container } from '@nextui-org/react'
import Get from '@/src/utils/hooks/get'

const SearchPage = ({ products, brands, query, website, params }) => {

  return (
    <Page>
      <Container lg>
        <SearchModule products={products} brands={brands} query={query} categories={website.categories} params={params} />
      </Container>
    </Page>
  )
}

export default SearchPage

export async function getServerSideProps(ctx) {
  let queryBuilder = `?popular=true&limit=200&${new URLSearchParams(ctx.query).toString()}`

  const useBrand = (ctx.query.useBrand !== undefined && ctx.query.useBrand == "true")

  return {
    props: {
      products: useBrand == false ? await Get(`/${ctx?.locale}/products/find/query${queryBuilder}`).then(r => r.data).catch(() => []) : null,
      brands: useBrand ? await Get(`/${ctx?.locale}/brands/find/query${queryBuilder}`).then(r => r.data).catch(() => []) : null,
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => { }),
      query: ctx.query.text || "",
      params: ctx.query
    }, // will be passed to the page component as props
  }
}