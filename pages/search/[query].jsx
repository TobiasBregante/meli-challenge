import Page from '@Page'
import SearchModule from '@/src/components/modules/search'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import data from '@/utils/sampleProducts'
import { Container } from '@nextui-org/react'

const SearchPage = ({ products, query }) => {

  return (
    <Page>
      <Container lg>
        <SearchModule data={products} query={query} />
      </Container>
    </Page>
  )
}

export default SearchPage

export async function getServerSideProps(ctx) {
  const genData = data(30)
  const fuse = new Fuse(genData, { keys: ["title"], threshold: 0.4 })

  const search = fuse.search(ctx.params.query)
  const filtered = genData.filter((p, pI) => search.some(subP => subP.item.title == p.title))

  return {
    props: {
      products: filtered,
      query: ctx.params.query
    }, // will be passed to the page component as props
  }
}