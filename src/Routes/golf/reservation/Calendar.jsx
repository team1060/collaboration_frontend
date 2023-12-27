import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button, Container } from '@mui/material';
import { getGolf } from '../../../services/golf/apiReserve';

export default function StaticDualCalendars({ parentView,parentGolf }) {
  const today = new Date();
  const tomorrow = new Date(today);
  // 내일 날짜부터 시작 
  tomorrow.setDate(today.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(null);
  const [activePicker, setActivePicker] = useState(null);
  const [view, setView] = useState(null);

  // 골프장명 버튼 
  const [golfName, setGolfName] = useState([]);

  // 골프장 버튼 클릭 이벤트 
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (golfName, index) => {
    setActiveButton((nextActiveButton) => (nextActiveButton === golfName ? null : golfName))
    // console.log(golfName);
    // 부모요소로 전달
    parentGolf(golfName, index)
    
  };
  // 오늘부터 2주 후
  const twoWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21);

  const handleDateChange = (newDate) => {
    // 선택된 날짜가 오늘부터 2주 이내인지 확인
    if (newDate >= today && newDate < twoWeeksLater) {
      setSelectedDate(newDate);
      setActivePicker(newDate.getMonth() === today.getMonth() ? 'left' : 'right');
      const date = newDate.getFullYear() +
        '-' + ((newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) +
        '-' + (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate());
      setView(date);

      // 부모에게 날짜 값 주기 
      parentView(date);
    }
  };

  // 골프장 버튼 get 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const golfData = await getGolf();
        setGolfName(golfData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (

    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="parent">
          <div className='internet'>
            <h2>인터넷 예약</h2>
            <br />
          </div>
        </div>
        <div className="calen2">
          <div className="calen">
            <Grid container className='cal'>
              <Grid item >
                {/* 현재 월 */}
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={activePicker === 'left' ? selectedDate : null}
                  onChange={handleDateChange}
                  minDate={tomorrow}
                  maxDate={twoWeeksLater}
                  onMonthChange={() => setActivePicker('left')}
                />
              </Grid>
              <Grid item xl={6} md={6} xs={12}>
                {/* 다음 월 */}
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={activePicker === 'right' ? selectedDate : null}
                  onChange={handleDateChange}
                  minDate={new Date(today.getFullYear(), today.getMonth() + 1, 1)}
                  maxDate={new Date(today.getFullYear(), today.getMonth() + 1, twoWeeksLater.getDate() - 1)}
                  onMonthChange={() => setActivePicker('right')}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="calen2">
          <div className="calen">
            <Grid className='cal'>
              <h3>예약자: 000님</h3>
              <h3>선택일: {view}</h3> {/* 선택한 날짜 표시 */}
            </Grid>
          </div>
        </div>

      </LocalizationProvider>

      {/* 골프장 */}
      <div className="parent">
        <div className='internet'>
          <h2>골프장</h2>
          <br />
        </div>
      </div>

        {/* 골프장 버튼 */}
        <div className="calparent">
          <div className="calen2">
          <div className="calen">
            
                <Grid container spacing={3}>
          {golfName.map((golf, i) => (
            <Grid item key={i}>
              <Button
                className={`button2 ${activeButton === golf.name ? 'active' : ''}`}
                variant="outlined"
                size="large"
                onClick={() => handleButtonClick(golf.name, i)}
              >
                {golf.name}
              </Button>
            </Grid>
          ))}
                </Grid>
            </div>
            </div>
        </div>
    </Container>

  );
}
