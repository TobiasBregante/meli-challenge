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
import { Analytics } from '@vercel/analytics/react';

const Page = ({ title, description, image, children, hiddeNavbar, hiddeFooter, bent, countryLocation }) => {
    const [content, setContent] = useState(null)

    useEffect(() => {
        setContent(JSON.parse(contentful))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {children || null}
                {!bent && <LocaleSwitcher contentful={content} fixed={true}/>}
                {!countryLocation && <BentHeader bent={bent}/>}
                {!hiddeFooter && <Footer categories={categories} contentful={content}/>}
            </UserWrapper>
            <Analytics/>
        </Fragment>
    )
}

export default Page