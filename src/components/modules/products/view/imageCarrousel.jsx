import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductImageCarrousel = ({ imgs }) => {
    const [imgSelected, setImgSelected] = useState(0),
        [swiper, setSwiper] = useState(null),
        [subSwiper, setSubSwiper] = useState(null)

    const handleThumbnailClick = (index) => () => {
        //Sync desktop side swiper images list
        swiper.slideTo(index)
        setImgSelected(index)
    }
    const handleSwiperChange = (e)=>{
        //Sync mobile sub swiper activeIndex with main swiper
        subSwiper.slideTo(e.activeIndex)
        setImgSelected(e.activeIndex)
    }

    return (
        <div className="row no-select">
            <div className="col-12 col-md-2 col-lg-2 d-none d-sm-block">
                {
                    imgs.slice(0, 5).map((img, imgI) => (
                        <div className="my-2 ms-2" key={imgI}>
                            <Image
                                className={`rounded-8 transition-25 pointer ${imgSelected == imgI ? "" : "opacity-25"}`}
                                src={`/img/${img}`}
                                width={100}
                                height={100}
                                layout="responsive"
                                onClick={handleThumbnailClick(imgI)}
                                alt={`image-${imgI}`}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="col-12 col-md-10 col-lg-10">
                <Swiper
                    onSwiper={setSwiper}
                    spaceBetween={10}
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    direction="horizontal"
                    onSlideChange={handleSwiperChange}
                >
                    {
                        imgs.map((img, imgI) => (
                            <SwiperSlide key={imgI}>
                                <Image
                                    className="rounded-top-8 pointer"
                                    src={`/img/${img}`}
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    priority={imgI == 0}
                                    alt={`image-${imgI}`}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
                <div className="d-block d-sm-none mt-2 px-1">
                    <Swiper
                        onSwiper={setSubSwiper}
                        spaceBetween={5}
                        slidesPerView={4.1}
                        direction="horizontal"
                    >
                        {
                            imgs.map((img, imgI) => (
                                <SwiperSlide key={imgI}>
                                    <Image
                                        className={`rounded-8 transition-25 ${imgSelected == imgI ? "" : "opacity-50"}`}
                                        src={`/img/${img}`}
                                        width={100}
                                        height={100}
                                        layout="responsive"
                                        onClick={handleThumbnailClick(imgI)}
                                        alt={`image-${imgI}`}
                                    />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default ProductImageCarrousel