import { nanoid } from "nanoid"
import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from "@/ui/modals";
import Card from "@/src/components/ui/cards";

const ProductImageCarrousel = ({ imgs }) => {
    const [imgSelected, setImgSelected] = useState(0),
        [swiper, setSwiper] = useState(null)

    const handleThumbnailClick = (index) => () => {
        swiper.slideTo(index)
        setImgSelected(index)
    }

    return (
        <div className="row p-2">
            <div className="col-12 col-md-2 col-lg-2 d-none d-sm-block">
                {
                    imgs.slice(0, 5).map((img, imgIndex) => (
                        <Image
                            key={img}
                            className={`rounded-8 my-2 pointer ${imgSelected == imgIndex ? "" : "opacity-50"}`}
                            src={`/img/${img}`}
                            width={100}
                            height={100}
                            layout="responsive"
                            onClick={handleThumbnailClick(imgIndex)}
                            alt={nanoid()}
                        />
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
                    onSlideChange={(e) => setImgSelected(e.activeIndex)}
                >
                    {
                        imgs.map(img => (
                            <SwiperSlide key={nanoid()}>
                                <Image
                                    key={img}
                                    className="rounded-8 my-2 pointer"
                                    src={`/img/${img}`}
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    alt={nanoid()}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default ProductImageCarrousel