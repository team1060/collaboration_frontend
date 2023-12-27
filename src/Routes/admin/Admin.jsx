import "./Style/AdminGlobal.scss"
// import { ResponsiveBar } from '@nivo/bar'
import "./Style/Admin.scss"
import MyResponsiveBar from "./AdminComponents/Bar";
import React, { useState } from 'react';
import ToggleGroupModeButton from "./AdminComponents/ToggleGroupModeButton";
import RankTable from "./AdminComponents/RankTable";
import data from './data/bardata.json'
import bardata2 from './data/bardata2.json'
import MyResponsivePie from "./AdminComponents/MyResponsivePie";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Admin() {
   // groupMode 상태를 'stacked'로 초기화 통계 버튼 
   const [groupMode, setGroupMode] = useState('stacked');
  //  console.log(bardata2);
 
return (
  <div className="AdminGlobal">
   
          <div>
          <Link to={"/admin"}>
            <Button  variant="contained" color="primary">
              상품
            </Button>
          </Link>
          <Link to={"/admin"}>            
            <Button  variant="contained" color="primary">
              골프장
            </Button>
          </Link>
          <Link to={"/"}>            
            <Button  variant="contained" color="primary">
            홈페이지 돌아가기
            </Button>
          </Link>
          </div>
          
    <hr />
    <br />
    <div className="Toggle">
      <h3>상품 월별 판매 그래프</h3>
        <ToggleGroupModeButton groupMode={groupMode} setGroupMode={setGroupMode} />
    </div>
       <div style={{ height: '400px' }}>
       <MyResponsiveBar groupMode={groupMode} data={data} />
       </div>
     

         <div className="RankPie">
                <div>
                      <h3>브랜드별 판매현황</h3>
                      <div  style={{ height: '400px' }}>
                        <MyResponsivePie data={bardata2} />
                      </div>
                  </div>
                <div >
                  <h3>월별 판매 순위</h3>
                  <RankTable data={data}/>
                </div>
           </div>
    </div>
);
}

export default Admin;