import Image from "next/legacy/image"
import { Avatar, Card, Grid, Text } from '@nextui-org/react'
import SaveBookmark from "../saveBookmark"
import { Fragment, useState } from "react"
import ProductComments from "../view/comments"
import Icon from "@/src/components/ui/icons"
import { useRouter } from "next/router"
import Bookmarks from "@/src/utils/product/bookmarks"

const BentCard = ({ data, className }) => {
    const [doubleTap, setDoubleTap] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const router = useRouter()

    const getRandomImg = max => Math.floor(Math.random() * max);

    const handlerLike = _id => {
        Bookmarks(_id, true)
        setDoubleTap(!doubleTap)
    }

    const goToBrand = () => router?.push(`/${router?.locale}/brand/${data?.brand?._id}`)

    const handlerComments = () => setOpenComments(!openComments)

    if(!data) {
        return null
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
                    src={data?.imgs[getRandomImg(data?.imgs?.length)]}
                    alt={data?.title}
                    layout='fill'
                    objectFit='contain'
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
            <Grid.Container className="bentBrandInfoFooter">
                <Grid xs={1.3}>
                    <Avatar 
                        onClick={goToBrand}
                        className="brandAvatar" 
                        size={'md'} 
                        src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${data?.brand?.imgs?.principal || 'uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY'}`} 
                    />
                </Grid>
                <Grid xs={7} className="bentCardDescription">
                    <Text size={12} color={'$white'} css={{ fontWeight: 600 }}>
                        {data?.brand?.brandName?.slice(0, 30)}
                    </Text>
                </Grid>
                <Grid xs={10} className="bentCardDescription">
                    <Text size={12} color={'$white'}>
                        {data?.description?.slice(0, 85)}...
                    </Text>
                </Grid>
            </Grid.Container>
        </Card>
    )
}

export default BentCard