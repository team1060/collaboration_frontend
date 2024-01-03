import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchGolfNames, postCourse, updateCourse } from '../../../services/admin/GolfCourse'; // 이름 변경 가져오기 골프장 no 에 대한 이름 수정 쿼리 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function GolfCourseModal({ open, onClose, course, onUpdate, onDelete, onPost  }) {
  // 초기값에 golf_date를 null로 설정
  const [golfCourseData, setGolfCourseData] = useState(course || {
    golf_date: null,
    golf_time: null,
    course_name: null, // 초기값 설정
    greenpee: null,    // 초기값 설정
    // golf_status: 0,  // 예약 상태를 0으로 설정
    // 다른 필드들에 대해서도 초기값을 설정하세요.
  });
  
  const [golfNames, setGolfNames] = useState([]); // 골프장 이름 목록
// golf_date 값을 변경할 때는 별도의 상태로 관리
  
  useEffect(() => {
    // course가 null일 때 golf_date를 null로 설정
    setGolfCourseData(course || { golf_date: null });
    fetchGolfNamesData(); // 골프장 이름 데이터 가져오기
  }, [course]);

 // 골프장 이름 데이터를 가져오는 함수
 const fetchGolfNamesData = async () => {
  const data = await fetchGolfNames();
  setGolfNames(data);
};
const handleChange = (event) => {
  const { name, value } = event.target;
  const newValue = name === "golf_status" ? value : (value || '');
  setGolfCourseData({ ...golfCourseData, [name]: newValue });
};

  const handleSave = async () => {
  try {
    if (golfCourseData.course_no) {
      // 이미 있는 코스 번호가 있는 경우 (수정)
      const response = await updateCourse(golfCourseData.course_no, golfCourseData);
      console.log("골프장 정보 수정 완료:", response);
      // 데이터 업데이트 후 페이지 새로 고침
      window.location.reload();
    } else {
      // 새로운 골프장을 생성하는 경우
      const response = await postCourse(golfCourseData);
      console.log("새로운 골프장 생성 완료:", response);
      // 데이터 업데이트 후 페이지 새로 고침
      window.location.reload();
    }
  } catch (error) {
    console.error("골프장 정보 처리 실패:", error);
  }
  onClose();
};
  const handleDelete = () => {
    onDelete(golfCourseData.golf_no);
    onClose();
  };
  const handleDateChange = (newDate) => {
    setGolfCourseData((prevData) => ({
      ...prevData,
      golf_date: dayjs(newDate).format("YYYY-MM-DD"), // 날짜를 "YYYY-MM-DD" 형식으로 변환
    }));
  };
  
  const handleTimeChange = (newTime) => {
    setGolfCourseData((prevData) => ({
      ...prevData,
      golf_time: dayjs(newTime).format("HH:mm"), // 시간을 "HH:mm" 형식으로 변환
    }));
  };
console.log(golfCourseData);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>골프장 상세페이지</DialogTitle>
      <DialogContent>
      <FormControl fullWidth>
          <InputLabel id="golf-no-label">골프장</InputLabel>
          <Select
            labelId="golf-no-label"
            id="golf_no"
            name="golf_no"
            value={golfCourseData.golf_no || ''}
            label="골프장"
            onChange={handleChange}
          >
            {golfNames.map((golf) => (
              <MenuItem key={golf.golf_no} value={golf.golf_no}>
                {golf.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
              margin="dense"
              name="course_name"
              label="코스 이름"
              type="text"
              fullWidth
              variant="standard"
              value={golfCourseData.course_name || ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="greenpee"
              label="그린피 금액"
              type="number"
              fullWidth
              variant="standard"
              value={golfCourseData.greenpee || ''}
              onChange={handleChange}
            />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
            label="예약 날짜"
            format="YYYY/MM/DD"
            value={golfCourseData.golf_date || null} // 초기값을 빈 문자열로 설정
            onChange={handleDateChange}
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
          />
          <TimePicker
            label="티오프 시간"
            ampm={false}
            value={golfCourseData.golf_time || null} // 초기값을 빈 문자열로 설정
            onChange={handleTimeChange}
            inputFormat={"hh:mm"}
            mask={"__:__"}
          />
        </LocalizationProvider>
        <FormControl fullWidth margin="dense">
          <InputLabel id="status-label">예약 상태</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="golf_status"
            value={golfCourseData.golf_status || ''}
            label="예약 상태"
           
            onChange={handleChange}
          >
            <MenuItem value={0}>예약 불가</MenuItem>
            <MenuItem value={1}>예약 가능</MenuItem>
          </Select>
        </FormControl>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        
        <Button onClick={handleSave}>생성</Button>
        
      </DialogActions>
    </Dialog>
  );
}

export default GolfCourseModal;
