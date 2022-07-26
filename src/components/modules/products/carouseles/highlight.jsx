import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ProductCard from '@/src/components/modules/products/cards/normal';
import Image from 'next/image';

const HighLightCarousel = ({ title, data }) => {

  return (
    <div className="mt-4">
      <Swiper
        spaceBetween={10}
        modules={[Pagination, Autoplay]}
        pagination
        autoplay
        slidesPerView={1}
      >
        {
          data.map((elem,i) => (
            <SwiperSlide key={i}>
              <Image src={`/./img/${elem}.webp`} width={2000} height={800} alt="carousel" className='rounded-bottom-16'/>
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
}

export default HighLightCarousel;