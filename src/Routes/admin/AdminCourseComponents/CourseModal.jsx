import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function GolfCourseModal({ open, onClose, course, onSave, onDelete, onCreate }) {
  const [golfCourseData, setGolfCourseData] = useState(course || {});

  useEffect(() => {
    setGolfCourseData(course || {});
  }, [course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGolfCourseData({ ...golfCourseData, [name]: value });
  };

  const handleSave = () => {
    if (golfCourseData.golf_no) {
      onSave(golfCourseData);
    } else {
      onCreate(golfCourseData);
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete(golfCourseData.golf_no);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{golfCourseData.golf_no ? '골프장 수정' : '신규 골프장 추가'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="골프장 이름"
          type="text"
          fullWidth
          variant="standard"
          value={golfCourseData.name || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="region"
          label="코스 이름"
          type="text"
          fullWidth
          variant="standard"
          value={golfCourseData.region || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="greenfee"
          label="그린피 금액"
          type="number"
          fullWidth
          variant="standard"
          value={golfCourseData.greenfee || ''}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="예약 날짜"
            inputFormat="yyyy/MM/dd"
            value={golfCourseData.golf_date}
            onChange={(newValue) => {
              setGolfCourseData({ ...golfCourseData, golf_date: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
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
            <MenuItem value={1}>예약 가능</MenuItem>
            <MenuItem value={0}>예약 불가</MenuItem>
          </Select>
        </FormControl>
        {/* Additional input fields for golf course data */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        {golfCourseData.golf_no && (
          <Button onClick={handleDelete} color="secondary">삭제</Button>
        )}
        <Button onClick={handleSave}>{golfCourseData.golf_no ? '수정' : '생성'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GolfCourseModal;
