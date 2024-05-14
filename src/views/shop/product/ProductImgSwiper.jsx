// import { Button } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
// import 'swiper/scc'
import { Autoplay, Navigation } from 'swiper/modules';

function ProductImgSwiper({ prop }) {
    console.log(prop)
    return (

        <div className="swiper-container" style={{ margin: "0 auto" }}>

            <Swiper
                slidesPerView={1}
                navigation={true}
                modules={[Navigation, Autoplay]}
            // autoplay={{ delay: 3000 }}
            >
                {prop?.image_prdts?.map((image, index) => (
                    <SwiperSlide key={image.uuid}>
                        <img style={{ maxWidth: "100%", objectFit: "cover" }} src={image.path} alt={`Slide ${index}`} />
                    </SwiperSlide>

                ))}

            </Swiper>

        </div>
    );
}

export default ProductImgSwiper;
