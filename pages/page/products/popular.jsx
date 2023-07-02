import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import UnorderedList from '@/src/components/modules/products/list/unordered'
import Get from '@/src/utils/hooks/get'
import { useEffect, useState } from 'react'

const Popular = ({ products,  website, equipamiento }) => {
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
      const filter = products?.length > 0 && products?.filter(filtering => filtering?.category !== 'Equipamiento')
      setDataFilter(filter)
    }, [products])

    return (
        <Page categories={website?.categories}>
            <Container lg css={{ mb: "$10" }}>
                <CategoriesCarousel data={website.categories}/>
                <UnorderedList title="Productos mas populares" data={dataFilter} />
            </Container>
        </Page>
    )
}

export default Popular

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get("products/find/query?popular=true&isWholesaleAndRetail=false&limit=200").then(r => r.data).catch(() => []),
            website: await Get("website").then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}