import Head from '@/components/wrapper/head'
import Header from '@/components/wrapper/header'
import Footer from '@/components/wrapper/footer'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify';
import UserWrapper from '@/utils/user/provider';
import categories from '@/src/utils/user/brand/categories';
import LocaleSwitcher from './localeSwitcher';

const Page = ({ title, description, image, children, hiddeNavbar }) => {
    return (
        <Fragment>
            <ToastContainer />
            <UserWrapper>
                <Head title={title} description={description} image={image} />
                {!hiddeNavbar && <Header categories={categories}/>}
                {
                    children || null
                }
                <LocaleSwitcher fixed={true}/>
                <Footer />
            </UserWrapper>
        </Fragment>
    )
}

export default Page