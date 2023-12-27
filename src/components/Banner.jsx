import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/Banner.scss'

function Banner() {
  // 배너 광고 이미지 배열
  const bannerImages = ['b001.png', 'b004.png', 'b005.png'];

  // 랜덤 이미지 선택을 위한 상태 변수
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    // 페이지가 로드될 때마다 랜덤 이미지 선택
    const randomIndex = Math.floor(Math.random() * bannerImages.length);
    const selectedImage = bannerImages[randomIndex];
    // 이미지 파일 경로를 설정할 때 "퍼블릭" 디렉토리를 기준으로 설정합니다.
    setRandomImage(`/img/banner/${selectedImage}`);
  }, []);

  return (
    <div className='Bann'>
      <div className=''>
        <Link to="/" >
          <img src={process.env.PUBLIC_URL + randomImage} alt=""/>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
