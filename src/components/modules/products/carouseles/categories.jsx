import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Card, Grid, Text } from '@nextui-org/react';

const CategoriesCarousel = ({ data }) => {

  return (
    <>
      <Grid.Container css={{ mt: 10 }}>
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
              slidesPerView: 3,
            },
          }}
        >
          {
            data?.length > 0 && data.sort((a, b) => b.views - a.views).map((category, i) => (
              <SwiperSlide key={i}>
                <a href={`/./page/category/${category.name}`}>
                  <Card css={{ borderRadius: 50, bg: "transparent", border: '2.5px solid $blue600' }} variant="flat" isPressable isHoverable>
                    <Card.Body>
                      <Grid.Container justify="center">
                        <Text color="$blue600" style={{ fontWeight: '600', lineHeight: 0, display: 'block' }}>
                          {category.name}
                        </Text>
                      </Grid.Container>
                    </Card.Body>
                  </Card>
                </a>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </Grid.Container>
    </>
  );
}

export default CategoriesCarousel;