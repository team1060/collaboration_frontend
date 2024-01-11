import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../style/CalendarSwiper.scss';
import { getCourse } from '../../../services/golf/apiReserve.js';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const CalendarSwiper = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  // 현재 날짜로부터 2달치 날짜를 저장할 상태
  const [dates, setDates] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [courses, setCourses] = useState([]);
  const [currentYearMonth, setCurrentYearMonth] = useState(''); // 현재 연도와 월을 저장할 상태
 // 날짜 생성 함수
 const generateTwoMonthsDates = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const datesArray = [];

  // 현재 연도와 월을 상태에 저장
  setCurrentYearMonth(`${today.getFullYear()}년 ${(today.getMonth() + 1).toString().padStart(2, '0')}월`);

  for (let d = start; d <= end; d.setDate(d.getDate() +1 )) {
    datesArray.push(new Date(d));
  }
  return datesArray;
};
useEffect(() => {
  if (ACCESS_TOKEN) { // 로그인 상태일 때만 API 호출
    fetchCourses();
  } else {
    // 로그인하지 않은 경우에 대한 처리 (예: 경고 메시지 표시)
  }
}, [ACCESS_TOKEN]);


useEffect(() => {
  setDates(generateTwoMonthsDates());
}, []);

const fetchCourses = async () => {
  try {
    const fetchedCourses = await getCourse();
    setCourses(fetchedCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

const handleDateClick = (date) => {
  if (!ACCESS_TOKEN) {
    alert("로그인이 필요합니다.");
    window.location.href = '/';
    return;
  }

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  setSelectedDate(formattedDate);
};

const getStatusText = (status) => {
  return status === 1 ? "예약가능" : "예약불가";
};

  return (
    <div className='container' id="calendarSwiper">
        <div className='mu'>
          <h2 className="month-header">{currentYearMonth}</h2> {/* 현재 연도와 월을 표시 */}
          {/* <h2 className=''>예약 가능날짜 확인하기</h2> */}
          <Link to={"/reservation/detail"}>
            <Button variant="contained" color="primary">
            골프 예약하기
            </Button>
            </Link>
        </div>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={7}
        slidesPerGroup={7}
      >
        {dates.map((date, index) => (
          <SwiperSlide key={index} onClick={() => handleDateClick(date)} className='SwiperSlide'>
            <div className={`day ${date.getDay() === 0 ? 'red' : date.getDay() === 6 ? 'blue' : ''}`}>
              {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}<br/>
              {date.getDate()}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedDate && (
        <div className="selected-day-card">
          <h3>선택된 날짜: {selectedDate}</h3>
          <div className="data-grid">
            {courses.filter(course => course.golf_date === selectedDate )
                     .map((course, index) => (
              <div key={index} className={`course-detail ${course.golf_status === 1 ? 'status-available' : 'status-unavailable'}`}>
                <p>코스: {course.course_name}</p>
                <p> {getStatusText(course.golf_status)}</p>
                {/* 추가 코스 정보 표시 */}
              </div>
            ))}
               
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSwiper;