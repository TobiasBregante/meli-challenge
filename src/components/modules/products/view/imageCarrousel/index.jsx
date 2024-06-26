import Image from "next/legacy/image"
import { Fragment, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from "@/src/components/ui/buttons";
import Icon from "@/src/components/ui/icons";
import { Grid, Modal } from "@nextui-org/react";

const ProductImageCarrousel = ({ imgs=['/img/e5.webp'] }) => {
    const [imgSelected, setImgSelected] = useState(0),
        [swiper, setSwiper] = useState(null),
        [subSwiper, setSubSwiper] = useState(null),
        [isZoomed, setIsZoomed] = useState(false)

    const handleThumbnailClick = (index) => () => {
        //Sync desktop side swiper images list
        swiper.slideTo(index)
        setImgSelected(index)
    }
    const handleSwiperChange = (e) => {
        //Sync mobile sub swiper activeIndex with main swiper
        subSwiper.slideTo(e.activeIndex)
        setImgSelected(e.activeIndex)
    }

    return (
        <Fragment>
            {
                imgs?.length > 0 && (
                    <Modal width="100vw" noPadding open={isZoomed} onClose={() => setIsZoomed(false)}
                    >
                        <div>
                            <Image
                                src={`${imgs[imgSelected]}`}
                                aria-labelledby={'Image Carousell'}
                                css={{ h: "auto", w: "50vw !important", "@mdMax": { w: "100vw !important" } }}
                                width={100}
                                height={100}
                                layout="responsive"
                                priority={imgSelected == 0}
                                alt={`image-${imgSelected}`}
                            />
                        </div>
                    </Modal>
                )
            }
            <Grid.Container direction="column">
                <Grid css={{ w: "100%" }}>
                    <Swiper
                        onSwiper={setSwiper}
                        modules={[Navigation]}
                        navigation
                        slidesPerView={1}
                        direction="horizontal"
                        onSlideChange={handleSwiperChange}
                    >
                        {
                            imgs?.length > 0 && imgs?.map((img, imgI) => (
                                <SwiperSlide key={imgI}>
                                    <div className="containProductImageCardOpen">
                                        <div className="productImageCardOpen">
                                            <Image
                                                style={{ display: 'block', margin: 'auto' }}
                                                src={`${img}`}
                                                alt={`Ver ${imgI}`}
                                                layout='fill'
                                                objectFit='contain'
                                                priority={imgI == 0}
                                                onClick={() => setIsZoomed(true)}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </Grid>
                <Grid css={{ w: "100%", mt: 10, mx: 10 }}>
                    <Swiper
                        onSwiper={setSubSwiper}
                        spaceBetween={0}
                        slidesPerView={7}
                    >
                        {
                            imgs?.length > 0 && imgs?.map((img, imgI) => (
                                <SwiperSlide key={imgI}>
                                    <div>
                                        <Image
                                            src={`${img}`}
                                            width={100}
                                            height={100}
                                            onClick={handleThumbnailClick(imgI)}
                                            className={`rounded-12 ${imgSelected == imgI ? "" : "opacity-25"}`}
                                            alt={`image-${imgI}`}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </Grid>
            </Grid.Container>
        </Fragment>
    )

    return (
        <div className="row no-select">
            <div className="col-12 col-md-2 col-lg-2 d-none d-sm-block">
                {
                    imgs.slice(0, 5).map((img, imgI) => (
                        <div className="my-2 ms-2" key={imgI}>
                            <Image
                                className={`rounded-8 transition-25 pointer ${imgSelected == imgI ? "" : "opacity-25"}`}
                                src={`${img}`}
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
            <div className={`col-12 col-md-12 ${isZoomed ? "transition-bg-filter-025 position-fixed top-50 start-50 translate-middle z-index-1 col-lg-12 d-flex flex-row justify-content-center bg-blur h-100 bg-black-traslucent-50" : "col-lg-10"}`}>
                <div className={`col-12 col-md-10 ${isZoomed ? "col-lg-6 mt-3" : "col-lg-12"}`}>
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
                                    <div >
                                        <Button className={`position-absolute right-1 top-1 z-index-2 shadow p-1 animate__animated animate__faster ${isZoomed ? "animate__zoomIn" : "animate__zoomOut"}`}
                                            rounded="circle" color="white"
                                            onClick={() => setIsZoomed(false)}>
                                            <Icon id="close" className="fs-3" />
                                        </Button>
                                    </div>
                                    <Image
                                        className={`${isZoomed ? "rounded-8" : "cursor-zoomIn rounded-top-8"}`}
                                        onClick={() => setIsZoomed(true)}
                                        src={`${img}`}
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
                                            src={`${img}`}
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

        </div>
    )
}

export default ProductImageCarrousel