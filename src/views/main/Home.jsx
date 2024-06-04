import React, { useState } from "react";

import CalendarSwiper from "./MainComponents/CalendarSwiper";
import ImgSwiper from "./MainComponents/ImgSwiper";
// 카드 컴포넌트
import GolfCourseSection from "./MainComponents/GolfCourseSection";
import GolfCourseCard from "./MainComponents/GolfCourseCard";

// import MainCard from './MainComponents/MainCard'

import ShopCard from "./MainComponents/ShopCard";
// import BannerManagement from './MainComponents/BannerManagement';
// import Banner from '../../components/Banner';

// import { Button } from '@mui/material';s
// 사이트 메인페이지
import Banner from "../../views/home/Banner";
// 이벤트 /소식

import Event from "./MainComponents/Event";
function HomeList() {
  // 골프 코스와 관련된 상태 정의
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 선택된 골프 코스를 업데이트하는 함수
  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setLoading(false);
  };

  // 에러 상태를 업데이트하는 함수
  const handleError = (error) => {
    setError(error);
    setLoading(false);
  };

  return (
    <>
      <div>
        <ImgSwiper />
        { false && <CalendarSwiper />}
        {/* 일정 관리표 */}
        {/* GolfCourseSection에 상태와 핸들러 함수를 props로 전달 */}
        { false && <GolfCourseSection
          onCourseSelection={handleCourseSelection}
          onError={handleError}
        />}
        {/* 선택된 골프 코스가 있으면 GolfCourseCard를 렌더링 */}
        {selectedCourse && (
          <GolfCourseCard
            course={selectedCourse}
            loading={loading}
            error={error}
          />
        )}
        {/* 골프소개  */}

        {false && <ShopCard />}
        <Banner />
        <Event />
      </div>
    </>
  );
}
export default HomeList;
