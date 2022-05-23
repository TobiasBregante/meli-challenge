import Head from '@/components/wrapper/head'
import Header from '@/components/wrapper/header'
import Footer from '@/components/wrapper/footer'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify';

const Page = ({title, description, image,children})=>{


    return (
        <Fragment>
            <Head title={title} description={description} image={image}/>
            <Header/>
            <ToastContainer/>
            {
                children || null
            }
            <Footer/>
        </Fragment>
    )
}

export default Page