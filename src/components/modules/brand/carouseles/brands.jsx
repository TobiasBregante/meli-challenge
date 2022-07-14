import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import BrandCard from '@/src/components/modules/brand/card';
import Icon from '@/ui/icons';
import { Grid, Text } from '@nextui-org/react';

const CarouselTitle = ({title}) => {
  return (
    <Grid.Container css={{mt:10}}>
      <Text h3>
        {title}
      </Text>
      <Text css={{pt:3, ml:10}} color="primary">
        Ver mas
        
      </Text>
      <Icon id="chevron_right" css={{pt:8}} color="primary" />
    </Grid.Container>
  )

}

const BrandCarousel = ({ title, data }) => {

  return (
    <div>
      <CarouselTitle title={title}/>
      <Swiper
        spaceBetween={10}
        modules={[Navigation, Autoplay]}
        autoplay={{delay:6000}}
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
            slidesPerView: 4.1,
          },
        }}
      >
        {
          data.map((cardData,cardI) => (
            <SwiperSlide key={cardI}>
              <BrandCard data={cardData} />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
}

export default BrandCarousel;