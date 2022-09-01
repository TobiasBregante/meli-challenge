import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import Link from 'next/link';

const HighLightCarousel = ({ data }) => {

  return (
    <Swiper
      spaceBetween={10}
      modules={[Pagination, Autoplay]}
      pagination
      autoplay
      slidesPerView={1}
    >
      {
        data.map((slide, i) => (
          <SwiperSlide key={i}>
            <Link href={slide.link} passHref>
              <Image src={`${slide.img}`} width={2000} height={800} alt="carousel" className='rounded-bottom-16' />
            </Link>
          </SwiperSlide>
        ))
      }

    </Swiper>
  );
}

export default HighLightCarousel;