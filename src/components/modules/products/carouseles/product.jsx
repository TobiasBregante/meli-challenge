import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { Badge, Grid, Text } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import Link from '@/src/utils/hooks/link';
import BannerSuscriber from '@/src/components/bannerSuscriber';

const CarouselTitle = ({ title, link }) => {

  return (
    <Grid.Container css={{ mt: 10 }}>
      <Text h3 css={{ p: 2, borderRadius: '10px' }}>
        {title}
      </Text>
      {
        link &&
        <Fragment>
          <Link href={link || "/"}>
            <Text css={{ pt: 6, ml: 10, fontWeight: 600 }} color="primary">
              <u>Ver más</u>
            </Text>
          </Link>
        </Fragment>
      }
    </Grid.Container>
  )

}

const ProductCarousel = ({ title, data, link, categoryHidde, bent }) => {
  const [dataFilter, setDataFilter] = useState([])

  useEffect(() => {
    const filter = data?.length > 0 && data?.filter(filtering => filtering?.category !== categoryHidde)
    setDataFilter(filter)
  }, [data])

  if (data?.length < 1) {
    return null
  } else {
    return (
      <div className='carousell-product'>
        <BannerSuscriber/>
        <CarouselTitle title={title} link={link} bent={bent}/>
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
              <SwiperSlide key={cardI} className='carousell'>
                <ProductCard data={cardData}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    );
  }

}

export default ProductCarousel;