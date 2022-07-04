import Page from '@Page'
import BrandProfileModule from '@/src/components/modules/brand/profile/index'
import data from '@/utils/sampleProducts'

const BrandPage = () => {
  
  return (
    <Page>
      <div className="container pt-3">
        <BrandProfileModule data={data} />
      </div>
    </Page>
  )
}

export default BrandPage