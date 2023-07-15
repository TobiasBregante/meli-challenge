import Image from "next/legacy/image"
import currency from 'currency.js'
import { Card, Grid } from '@nextui-org/react'
import SaveBookmark from "../saveBookmark"
import { Fragment, useEffect, useState } from "react"
import ProductComments from "../view/comments"
import Icon from "@/src/components/ui/icons"
import { useRouter } from "next/router"
import Bookmarks from "@/src/utils/product/bookmarks"

const BentCard = ({ data, className }) => {
    const [doubleTap, setDoubleTap] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const router = useRouter()

    const handlerLike = _id => {
        Bookmarks(_id, true)
        setDoubleTap(!doubleTap)
    }

    const handlerComments = () => setOpenComments(!openComments)

    if(!data) {
        return null
    }

    const lowestPriceSelect = () => {
        const {
            minPerCurve,
            minPerDozen,
            minPerQuantity,
            minPerTask,
            minPerWholesale,
            perCurve,
            perDozen,
            perQuantity,
            perTask,
            retail,
            wholesale
        } = data?.prices
        
        let prices = [
            retail
            || minPerCurve
            || minPerDozen
            || minPerQuantity
            || minPerTask
            || minPerWholesale
            || perCurve
            || perDozen
            || perQuantity
            || perTask
            || wholesale
        ]
        prices = prices.filter(price => price != 0 && price != undefined)
        
        return currency(Math.min(...prices), { decimal: ",", separator: "." }).format()
    }

    const goToProduct = () => router?.push(`/${router?.locale}/product/${data?._id}`)

    return (
        <Card 
            variant="flat" 
            css={{ bg: "$white", }} 
            className={`${className} bentCard`} 
            onDoubleClick={() => handlerLike(data?._id)}>
           <div className='bentImageCard'>
                <Image
                    style={{ display: 'block', margin: 'auto' }}
                    src={data?.imgs[0]}
                    alt={data?.title}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            {openComments && (
                <Fragment>
                    <ProductComments data={data} bentComment={true}/>
                    <button className="bentCommentBtnClose" onClick={handlerComments}>
                        <Icon id={'expand_more'} className='bentIconComment'/>
                    </button>
                </Fragment>
            )}
            <Grid className='bentControls'>
                <SaveBookmark _id={data?._id} className="bentLike" doubleTap={doubleTap} bent={true}/>
                <button className="bentCommentBtn" onClick={handlerComments}>
                    <Icon id={'forum'} className='bentIconComment'/>
                </button>
                <button className="bentCommentBtn" onClick={goToProduct}>
                    <Icon id={'bolt'} className='bentIconComment bentBoltBtn'/>
                </button>
            </Grid>
        </Card>
    )
}

export default BentCard