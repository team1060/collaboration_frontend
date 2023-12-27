// import { Button } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
// import 'swiper/scc'
import { Navigation } from 'swiper/modules';

// 스와이퍼 css 
import '../style/Swiper.scss'

function ImgSwiper() {
  return (

    <div className="swiper-container" style={{maxWidth:"1200px", margin:"0 auto"}}>

       <Swiper
      slidesPerView={1}
      navigation={true} modules={[Navigation]} style={{height:"500px"}}

      >
        <SwiperSlide><img src="./img/pc04.jpg" alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img src="./img/pc05.jpg"  alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img src="./img/pc06.jpg"  alt="Slide 3" /></SwiperSlide>
        
      </Swiper>
      
    </div>
  );
}

export default ImgSwiper;
