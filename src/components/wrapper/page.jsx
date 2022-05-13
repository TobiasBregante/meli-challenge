import Header from '@/components/wrapper/header'
import Footer from '@/components/wrapper/footer'
import { Fragment } from 'react'

const Page = ({children})=>{


    return (
        <Fragment>
            <Header/>
            {
                children || null
            }
            <Footer/>
        </Fragment>
    )
}

export default Page