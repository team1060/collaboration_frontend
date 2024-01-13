import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from '../../../services/axiosInstance.js';

const GolfCourseSection = ({ onCourseSelection, onError }) => {
  const [loaded, setLoaded] = useState(false);

  const fetchCoursesByRegion = useCallback(async (selectedRegion) => {
    try {
      const response = await axiosInstance.get(`/golf`);
      const allCourses = response.data;
      const filteredCourses = allCourses.filter(course => course.region === selectedRegion);

      if (filteredCourses.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredCourses.length);
        const randomCourse = filteredCourses[randomIndex];
        onCourseSelection(randomCourse);
      } else {
        onCourseSelection(null);
      }
    } catch (err) {
      onError(err);
    }
  }, [onCourseSelection, onError]);

  useEffect(() => {
    if (!loaded) {
      // 컴포넌트가 처음 로드될 때 한 번만 fetchCoursesByRegion 함수 호출
      fetchCoursesByRegion('경기');
      setLoaded(true); // 로딩이 완료됨을 표시
    }
  }, [loaded, fetchCoursesByRegion]);

  return (
    <div style={{ width: "1200px", margin: "0 auto", marginTop: "15px" }}>
      <div style={{ padding: "15px 15px 10px" }}>
        <Button style={{marginRight: "5px"}}variant="contained" color="primary" onClick={() => fetchCoursesByRegion('경기')}>경기</Button>
        <Button style={{marginRight: "5px"}}variant="contained" color="primary" onClick={() => fetchCoursesByRegion('충청')}>충청</Button>
        <Button variant="contained" color="primary" onClick={() => fetchCoursesByRegion('경상')}>경상</Button>
      </div>
    </div>
  );
};

export default GolfCourseSection;
