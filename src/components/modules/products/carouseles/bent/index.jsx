import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import BentCard from '../../cards/bentCard';
import { Grid, Text } from '@nextui-org/react';
// import required modules

const BentSwiper = ({ data }) => {
    const [swipeUp, setSwipeUp] = useState(0)
    // const [lastDate, setLastDate] = useState(new Date())

    useEffect(() => {
        setSwipeUp(0)
        // setLastDate(new Date())
    }, [data])

    useEffect(() => {
        setSwipeUp(0)
    }, [swipeUp])
    
    return (
        <div className='bentSwiper'>
            <Grid.Container className='bentHeaderContainer'>
                <Text h2 className="bentHeaderTitle">
                    Bents
                </Text>
            </Grid.Container>
            <Swiper
                direction={'vertical'}
                // onSlideChange={() => {
                    
                // }}
            >
                {
                    data?.length > 0 && data?.map((obj, i) => (
                        <SwiperSlide key={i}>
                            <BentCard data={obj}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default BentSwiper
