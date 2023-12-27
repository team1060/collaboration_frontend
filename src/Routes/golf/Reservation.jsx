import './style/Reservation.scss'
import Head from "./reservation/Head";
import Calendar from "./reservation/Calendar";
import Course from "./reservation/Course";
import { useState } from "react";
import { Class } from '@mui/icons-material';


function Reservation() {

  const [view, setView] = useState(null);
  const [golf, setGolf] = useState('');
  const [index, setIndex] = useState();
  // 캘린더에서 날짜 값 받아서 버튼에 주기 
  const parentView = (view) => {
    setView(view);
    console.log(view);
  }

  const parentGolf = (golf, i) => {
    setGolf(golf);
    const plus = i + 1;
    setIndex(plus);
    console.log(plus+golf);
  }

  return (
    <div id='reserve'>
      <Head />
      <Calendar parentView={parentView} parentGolf={parentGolf}/>
      <Course golf={golf} view={view} index={index}/>
      {/* <div style={{color: '$redColor'}}>
        테스트
      </div> */}

    </div>
  )
}

export default Reservation;
