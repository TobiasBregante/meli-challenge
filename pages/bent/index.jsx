import Page from '@Page'
import CategoriesCarousel from '@/src/components/modules/products/carouseles/categories'
import { Container } from '@nextui-org/react'
import Get from '@/src/utils/hooks/get'
import { useEffect, useState } from 'react'
import BentSwiper from '@/src/components/modules/products/carouseles/bent'
import GetItem from '@/src/utils/localStorage/getItem'
import { useRouter } from 'next/router'

const Bent = ({ allProducts, website }) => {
    const [dataFilter, setDataFilter] = useState([])
    const router = useRouter()

    const handlerSetSortByFavorite = async () => {
        const latestBookmarkProduct = GetItem('bookmarks')?.bookmarks?.length > 0 && GetItem('bookmarks')?.bookmarks[GetItem('bookmarks')?.bookmarks?.length - 1]
        const data = GetItem('bookmarks')?.bookmarks?.length > 0 && await Get(`/${router?.locale}/products/product/${latestBookmarkProduct}`).then(r=>r.data).catch(()=>({}))
        const favoriteCategory = await Get(`/${router?.locale}/products/find/query?popular=true&limit=200${data?.category ? `&category=${encodeURI(data?.category)}` : ''}`).then(r => r.data).catch(() => [])
        setDataFilter(favoriteCategory)
    }
    
    useEffect(() => {
        handlerSetSortByFavorite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, allProducts])


    return (
        <Page bent={true} categories={website?.categories} title='Bent - Iwarket' hiddeNavbar={true} hiddeFooter={true}>
            <Container xl css={{ mb: "$10" }} className='container-unorderedList container-bent'>
                <BentSwiper data={dataFilter}/>
            </Container>
        </Page>
    )
}

export default Bent

export async function getServerSideProps(ctx) {
    return {
        props: {
            allProducts: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=200`).then(r => r.data).catch(() => []),
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => { }),
        }, // will be passed to the page component as props
    }
}