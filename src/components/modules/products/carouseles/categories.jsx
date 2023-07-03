import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Card, Grid, Text } from '@nextui-org/react';
import { Fragment } from 'react';
import Link from '@/src/utils/hooks/link';

const CategoriesCarousel = ({ data }) => {
  return (
    <Fragment>
      <Grid.Container css={{ mt: 10 }}>
      </Grid.Container>
      <hr className='lineHrTop' style={{ position: 'absolute', left: 0, right: 0, width: '100vw', margin: 0, padding: 0 }}/>
      <Grid.Container>
        <Swiper
          spaceBetween={0}
          modules={[Autoplay]}
          autoplay
          breakpoints={{
            // when window width is >= 640px
            350: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 8,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
        >
          {
            data?.length > 0 && data.sort((a, b) => b.views - a.views).map((category, i) => (
              <SwiperSlide key={i} className='carousellCategories'>
                <Link href={`/page/category/${category.name}`}>
                  <Card title={category?.name} className='filterChoosed' css={{ borderRadius: 50 }} variant="flat" isPressable isHoverable>
                    <Card.Body>
                      <Grid.Container justify="center">
                        <Text color="$blue600" style={{ fontWeight: '600', lineHeight: 0, display: 'block' }}>
                          {category?.name?.length > 14 ? `${category?.name?.slice(0, 11)}...` : category?.name}
                        </Text>
                      </Grid.Container>
                    </Card.Body>
                  </Card>
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Grid.Container>
      <hr className='lineHrBottom' style={{ position: 'absolute', left: 0, right: 0, width: '100vw', margin: 0, padding: 0 }}/>
    </Fragment>
  );
}

export default CategoriesCarousel;