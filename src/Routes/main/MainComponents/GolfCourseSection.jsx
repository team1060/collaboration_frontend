import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from '../../../services/axiosInstance.js';

const GolfCourseSection = ({ onCourseSelection, onError }) => {
  useEffect(() => {
    fetchCoursesByRegion('경기');
  }, [0]);

  const fetchCoursesByRegion = async (selectedRegion) => {
    try {
      const response = await axiosInstance.get(`/admin/golf`);
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
  };

  return (
    <div style={{ width: "1200px", margin: "0 auto", marginTop: "15px" }}>
      <div style={{ paddingLeft: "20px" }}>
        <Button variant="contained" color="primary" onClick={() => fetchCoursesByRegion('경기')}>경기</Button>
        <Button variant="contained" color="primary" onClick={() => fetchCoursesByRegion('충청')}>충청</Button>
        <Button variant="contained" color="primary" onClick={() => fetchCoursesByRegion('경상')}>경상</Button>
      </div>
    </div>
  );
};

export default GolfCourseSection;
