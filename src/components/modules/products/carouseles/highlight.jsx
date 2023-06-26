import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';

const HighLightCarousel = ({ data }) => {

  return (
    <Swiper
      spaceBetween={10}
      modules={[Pagination, Autoplay]}
      pagination
      autoplay
      slidesPerView={1}
      style={{
        marginTop: '1% !important',
        display: 'block !important'
      }}
    >
      {
        data?.length > 0 && data.map((slide, i) => (
          <SwiperSlide key={i}>
            <a href={slide.link}>
              <div className='banner-img'>
                <Image
                  priority 
                  src={`${slide.img}`} 
                  alt="carousel"  
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </a>
          </SwiperSlide>
        ))
      }

    </Swiper>
  );
}

export default HighLightCarousel;