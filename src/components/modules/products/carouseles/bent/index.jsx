import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import BentCard from '../../cards/bentCard';
// import required modules

const BentSwiper = ({ data }) => {
    return (
        <div className='bentSwiper'>
            <Swiper
                direction={'vertical'}
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
