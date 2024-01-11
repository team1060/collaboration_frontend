// import { Link } from 'react-router-dom';
import '../style/Event.scss'
import React from 'react';
// import { Button } from '@mui/material';

function Event() {
  return (
    <div className="event-container">
    <div className='textTitle'>
      <h2 className="event-title">이벤트 / 소식</h2>
      
          {/* <Link to={"/"}>
            <Button variant="contained" color="primary">
              이벤트 전체보기
            </Button>
            </Link> */}
    </div>
    <div className="content-container">

            <div className="left-box">
          <div className="image-box1" style={{ backgroundImage: 'url(./img/e002.jpg)' }}>
            
            {/* <Link to={"/"}>
            <Button variant="contained" color="primary">
            이벤트 확인하기
            </Button>
            </Link> */}
          </div>
        </div>

        <div className="right-box">
          <div className="image-box2" style={{ backgroundImage: 'url(./img/e002.jpg)' }}>
          {/* <Link to={"/"}>
            <Button variant="contained" color="primary">
              이벤트 확인하기
            </Button>
            </Link> */}
          </div>
          <div className="image-box2" style={{ backgroundImage: 'url(./img/e001.jpg)' }}>
          {/* <Link to={"/"}>
            <Button variant="contained" color="primary">
            이벤트 확인하기
            </Button>
            </Link> */}
          </div>
          <div className="image-box2" style={{ backgroundImage: 'url(./img/product/2/20200916023241973_300.jpg)' }}>
          {/* <Link to={"/이벤트1"}>
            <Button variant="contained" color="primary">
            이벤트 확인하기
            </Button>
            </Link> */}
          </div>
          <div className="image-box2" style={{ backgroundImage: 'url(./img/product/2/20200916023241973_300.jpg)' }}>
          {/* <Link to={"/"}>
            <Button variant="contained" color="primary">
            이벤트 확인하기
            </Button>
            </Link> */}
          </div>
        </div>
        
      </div>
    </div>

);
}


export default Event;