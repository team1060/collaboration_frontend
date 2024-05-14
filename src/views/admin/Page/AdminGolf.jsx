import MyResponsiveBar from "../AdminGolfComponents/Bar";
import React, { useState } from "react";
import ToggleGroupModeButton from "../AdminGolfComponents/ToggleGroupModeButton";
import RankTable from "../AdminGolfComponents/RankTable";
import data from "../data/golfdata.json";
import bardata2 from "../data/golfdata2.json";
import MyResponsivePie from "../AdminGolfComponents/MyResponsivePie";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function AdminGolf() {
  // groupMode 상태를 'stacked'로 초기화 통계 버튼
  const [groupMode, setGroupMode] = useState("stacked");
  //  console.log(bardata2);

  return (
    <div className="AdminGlobal">
      <div>
        <Link to={"/admin"}>
          <Button variant="contained" color="primary">
            상품
          </Button>
        </Link>
        <Link to={"/admin/golf"}>
          <Button variant="contained" color="primary">
            골프장
          </Button>
        </Link>
        <Link to={"/"}>
          <Button variant="contained" color="primary">
            홈페이지 돌아가기
          </Button>
        </Link>
      </div>

      <hr />
      <br />
      <div className="Toggle">
        <h3>골프장 월별 예매 그래프</h3>
        <ToggleGroupModeButton
          groupMode={groupMode}
          setGroupMode={setGroupMode}
        />
      </div>
      <div style={{ height: "400px" }}>
        <MyResponsiveBar groupMode={groupMode} data={data} />
      </div>

      <div className="RankPie">
        <div>
          <h3>골프장별 예매현황</h3>
          <div style={{ height: "400px" }}>
            <MyResponsivePie data={bardata2} />
          </div>
        </div>
        <div>
          <h3>골프장 인기 순위</h3>
          <RankTable data={data} />
        </div>
      </div>
    </div>
  );
}

export default AdminGolf;
