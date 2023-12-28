// MyResponsivePie.jsx
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MyGolfResponsivePie = ({ data }) => (
  
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        innerRadius={0.5} // 파이의 내부 반경을 설정
        padAngle={0.7} // 각 파이 사이의 간격
        cornerRadius={3} // 파이의 모서리를 둥글게 만듭
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        // defs={[
        //     // ... 디자인을 위한 설정들 ...
        // ]}
        fill={[
          { match: { id: '구리G' }, id: '구리G' },
          
        ]}
        // legends={[
        //     {
        //        anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 150,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //         symbolShape: 'circle',
        //         effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
        //     }
        // ]}
    />
);

export default MyGolfResponsivePie;
