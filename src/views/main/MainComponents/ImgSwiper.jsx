// import { Button } from '@mui/material';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import 'swiper/swiper-bundle.css';
import "swiper/css/navigation";
// import 'swiper/scc'
import { Navigation } from "swiper/modules";

// 스와이퍼 css

function ImgSwiper() {
  return (
    <div className="swiper-container" id="imgSwiper">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
      >
        <SwiperSlide>
          <img src="/img/main/pc04.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/main/pc05.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/main/pc06.jpg" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImgSwiper;
