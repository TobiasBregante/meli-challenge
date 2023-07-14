import Head from '@/components/wrapper/head'
import Header from '@/components/wrapper/header'
import Footer from '@/components/wrapper/footer'
import { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import UserWrapper from '@/utils/user/provider';
import categories from '@/src/utils/user/brand/categories';
import LocaleSwitcher from './localeSwitcher';
import contentful from './content';
import BentHeader from './bentHeader';
import { useRouter } from 'next/router';

const Page = ({ title, description, image, children, hiddeNavbar, hiddeFooter, bent, countryLocation }) => {
    const [content, setContent] = useState(null)
    const router = useRouter()

    useEffect(() => {
        setContent(JSON.parse(contentful))
        children = {
            ...children,
            props: {
                ...children['props'],
                contentful: JSON.parse(contentful)
            }
        }
    }, [children])
    
    return (
        <Fragment>
            <ToastContainer />
            <UserWrapper>
                <Head title={title} description={description} image={image} />
                {!hiddeNavbar && <Header contentful={content} categories={categories}/>}
                {
                    children || null
                }
                {!bent && <LocaleSwitcher contentful={content} fixed={true}/>}
                {!countryLocation && <BentHeader bent={bent}/>}
                {!hiddeFooter && <Footer categories={categories} contentful={content}/>}
            </UserWrapper>
        </Fragment>
    )
}

export default Page