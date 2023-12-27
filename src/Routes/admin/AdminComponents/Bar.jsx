// Bar.jsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
// import data from '../data/bardata.json'; // 데이터 파일의 실제 경로 확인 필요

// MyResponsiveBar 컴포넌트는 ResponsiveBar 차트를 렌더링합니다.
// 데이터는 bardata.json 파일에서 가져옵니다.
const MyResponsiveBar = ({ groupMode ,data}) => (
    <ResponsiveBar
        data={data}
        keys={['기타', 'PING 핑', '혼마', '미즈노', '브리지스톤', '야마하']}
        indexBy="날짜" // 데이터와 일치하도록 'country'에서 '날짜'로 변경
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode={groupMode}
        // onClick={onBarClick} // 클릭 이벤트 핸들러 추가 실패 
        // ... (기타 차트 설정은 유지)
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '월 표시', // x축 범례를 'country'에서 '날짜'로 변경
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '브랜드', // y축 범례 수정 필요 없음
            legendPosition: 'middle',
            legendOffset: -40
        }}
        // ... (색상별 범례)
         legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    />
);

export default MyResponsiveBar;
