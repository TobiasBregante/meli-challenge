import Page from '@Page'
import SearchModule from '@/src/components/modules/search'
import data from '@/utils/sampleProducts'

const SearchPage = () => {
  
  return (
    <Page>
      <div className="container pt-3">
        <SearchModule data={data} />
      </div>
    </Page>
  )
}

export default SearchPage