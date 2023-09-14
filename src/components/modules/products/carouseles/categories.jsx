import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Avatar, Card, Grid, Text } from '@nextui-org/react';
import { Fragment, useEffect } from 'react';
import Link from '@/src/utils/hooks/link';

const CategoriesCarousel = ({ data }) => {
  return (
    <Fragment>
      <Grid.Container css={{ mt: 10 }}>
      </Grid.Container>
      <Grid.Container justify='center'>
        <Swiper
          spaceBetween={5}
          modules={[Autoplay]}
          autoplay
          breakpoints={{
            // when window width is >= 640px
            350: {
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 7,
            },
            1280: {
              slidesPerView: 7,
            },
          }}
        >
          {
            data?.length > 0 && data.sort((a, b) => b.views - a.views).map((category, i) => (
              <SwiperSlide key={i} className='carousellCategories'>
                <Link href={`/category/${category.name}`}>
                  <Avatar isBordered src={category?.img} size={'xl'} css={{ m: 'auto', cursor: 'pointer' }}/>
                  <Text css={{ m: 'auto', textAlign: 'center' }}>
                    {category?.name?.length > 12 ? `${category?.name?.slice(0, 12)}...` : category?.name}
                  </Text>
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Grid.Container>
    </Fragment>
  );
}

export default CategoriesCarousel;