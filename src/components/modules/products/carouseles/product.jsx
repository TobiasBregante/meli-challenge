import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { useState } from 'react'
import { Grid, Text } from '@nextui-org/react';

const CarouselTitle = ({ title, link }) => {
  return (
    <Grid.Container css={{ mt: 10 }}>
      <Text h3>
        {title}
      </Text>
      {
        link &&
        <>
          <a href={link || "/./"}>
            <Text css={{ pt: 3, ml: 10 }} color="primary">
              Ver mas
            </Text>
          </a>
          <Icon id="chevron_right" css={{ pt: 8 }} color="primary" />
        </>
      }
    </Grid.Container>
  )

}

const ProductCarousel = ({ title, data, link }) => {

  return (
    <div>
      <CarouselTitle title={title} link={link} />
      <Swiper
        spaceBetween={10}
        modules={[Navigation]}
        navigation
        breakpoints={{
          // when window width is >= 640px
          350: {
            slidesPerView: 1.4,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3.2,
          },
          1280: {
            slidesPerView: 5.2,
          },
        }}
      >
        {
          data?.length > 0 && data.map((cardData, cardI) => (
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