import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Card, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';

const CategoriesCarousel = ({ data }) => {

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
            data.sort((a, b) => b.views - a.views).map((category, i) => (
              <SwiperSlide key={i}>
                <Link href={`/./page/category/${category.name}`} passHref>
                  <Card css={{ bg: "$blue600" }} variant="flat" isPressable isHoverable>
                    <Card.Body>
                      <Grid.Container justify="center">
                        <Text h5 color="white">
                          {category.name}
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
    </>
  );
}

export default CategoriesCarousel;