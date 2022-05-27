import Head from '@/components/wrapper/head'
import Header from '@/components/wrapper/header'
import Footer from '@/components/wrapper/footer'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify';
import UserWrapper from '@/utils/user/provider';

const Page = ({ title, description, image, children }) => {


    return (
        <Fragment>
            <ToastContainer />
            <UserWrapper>
                <Head title={title} description={description} image={image} />
                <Header />
                {
                    children || null
                }
                <Footer />
            </UserWrapper>
        </Fragment>
    )
}

export default Page