import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { Grid, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const CarouselTitle = ({ title, link }) => {
  return (
    <Grid.Container css={{ mt: 10 }}>
      <Text h3 css={{ p: 2, borderRadius: '10px' }}>
        {title}
      </Text>
      {
        link &&
        <>
          <a href={link || "/./"}>
            <Text css={{ pt: 6, ml: 10, fontWeight: 600 }} color="primary">
              <u>Ver más</u>
            </Text>
          </a>
          <Icon id="chevron_right" css={{ pt: 10 }} color="primary" />
        </>
      }
    </Grid.Container>
  )

}

const ProductCarousel = ({ title, data, link, categoryHidde }) => {
  const [dataFilter, setDataFilter] = useState([])

  useEffect(() => {
    const filter = data?.length > 0 && data?.filter(filtering => filtering?.category !== categoryHidde)
    setDataFilter(filter)
  }, [data])

  if (data?.length < 1) {
    return null
  } else {
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
            dataFilter?.length > 0 && dataFilter?.map((cardData, cardI) => (
              <SwiperSlide key={cardI}>
                <ProductCard data={cardData} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    );
  }

}

export default ProductCarousel;