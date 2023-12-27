// EventDetail.js (라우트 컴포넌트)
// 골프 예매 디테일 
import React from 'react';
import { useLocation } from 'react-router-dom';

const EventDetail = () => {
  const {state} = useLocation();
  

  return (
    <div>
      
      <div style={{paddingTop:"150px"}}>
        <h2>골프 예매 상세 페이지</h2>
        <p>골프장 이름: {state.name}</p>
        <p>예약 현황: {state.status}</p>
        <p>골프장 상세설명: {state.description}</p>
        <p>골프장 가격: {state.price}</p>
        <p>골프장 내용: {state.content}</p>
        

        {/* 이벤트 상세 정보 표시 */}
      </div>
      
    </div>
  );
};

export default EventDetail;
