import Page from '@Page'
import SearchModule from '@/src/components/modules/search'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import content from '@/utils/sampleProducts'

const SearchPage = () => {
  const router = useRouter()
  
  const fuse = new Fuse(content, { keys: ["title"], threshold: 0.4 })
  
  const search = fuse.search("a")
  const filtered = content.filter((p, pI) => search.some(subP => subP.item.title == p.title))

  return (
    <Page>
      <div className="container pt-3">
        <SearchModule data={filtered} query={"a"} />
      </div>
    </Page>
  )
}

export default SearchPage