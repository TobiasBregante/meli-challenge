import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/components/modules/products/card';
import Text from '@/ui/texts'
import Icon from '@/ui/icons';
import { useState } from 'react'

const CarouselTitle = ({title}) => {
  const [hovering, setHover] = useState(false)
  return (
    <div className="d-flex flex-row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Text tag="h3">
        {title}
      </Text>
      <Text className={`ms-3 mt-1 d-flex pointer animate__animated animate__fadeInLeft animate__faster ${hovering ? "" : "d-none"}`} color="primary">
        Ver mas
        <Icon id="chevron_right" className="animate__animated animate__fadeInLeft " />
      </Text>
    </div>
  )

}

const ProductCarousel = ({ title, data }) => {
  const [selected,setSelected] = useState(false)

  const onClick = ()=>{
    
  }

  return (
    <div>
      <CarouselTitle title={title}/>
      <Swiper
        spaceBetween={10}
        modules={[Navigation]}
        navigation
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1.2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2.2,
          },
          1280: {
            slidesPerView: 4.2,
          },
        }}
      >
        {
          data.map((cardData,cardI) => (
            <SwiperSlide key={cardI}>
              <ProductCard data={cardData} />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
}

export default ProductCarousel;