import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Card, Grid, Text } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from '@/src/utils/hooks/link';

const FiltersCarousel = ({ data }) => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('')

  useEffect(() => {
    const filterID = router?.asPath?.replace('/', '')?.replace('#', '')
    setActiveFilter(filterID)
  }, [router?.asPath])

  return (
    <Fragment>
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
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 9,
            },
            1280: {
              slidesPerView: 9,
            },
          }}
        >
          {
            data?.length > 0 && data.sort((a, b) => b.views - a.views).map((category, i) => (
              <SwiperSlide key={i}>
                <Link href={`#${category?.name}`}>
                  <Card className={'filterChoosed'} css={{ borderRadius: 50, border: '2.5px solid $blue600' }} variant="flat" isPressable isHoverable>
                    <Card.Body>
                      <Grid.Container justify="center">
                        <Text color="$blue600" style={{ fontWeight: '600', lineHeight: 0, display: 'block' }}>
                          {category?.name}
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
    </Fragment>
  );
}

export default FiltersCarousel;