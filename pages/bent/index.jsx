import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import Get from '@/src/utils/hooks/get'
import { useEffect, useState } from 'react'
import BentSwiper from '@/src/components/modules/products/carouseles/bent'

const Bent = ({ products,  website }) => {
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
      const filter = products?.length > 0 && products?.filter(filtering => filtering?.category !== 'Equipamiento')
      setDataFilter(filter)
    }, [products])

    return (
        <Page bent={true} categories={website?.categories} title='Bent - SaladaApp' hiddeNavbar={true} hiddeFooter={true}>
            <Container lg css={{ mb: "$10" }} className='container-unorderedList container-bent'>
                <BentSwiper data={dataFilter}/>
            </Container>
        </Page>
    )
}

export default Bent

export async function getServerSideProps(ctx) {

    return {
        props: {
            products: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=200`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => { })
        }, // will be passed to the page component as props
    }
}