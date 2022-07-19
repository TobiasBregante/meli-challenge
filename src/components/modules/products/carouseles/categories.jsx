import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Card, Grid, Text } from '@nextui-org/react';
import categories from '@/src/utils/user/brand/categories';

const CategoriesCarousel = () => {

  return (
    <>
      <Grid.Container css={{ mt: 10 }}>
        <Text h3>
          Categorias
        </Text>
      </Grid.Container>
      <Grid.Container>
        <Swiper
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay
          breakpoints={{
            // when window width is >= 640px
            350: {
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {
            categories.map((elem, i) => (
              <SwiperSlide key={i}>
                <Card css={{ bg: "$blue600" }} variant="flat" isPressable isHoverable>
                  <Card.Body>
                    <Grid.Container justify="center">
                      <Text h5 color="white">
                        {elem}
                      </Text>
                    </Grid.Container>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </Grid.Container>
    </>
  );
}

export default CategoriesCarousel;