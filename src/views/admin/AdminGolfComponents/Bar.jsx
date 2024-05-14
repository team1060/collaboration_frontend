// MyGolfResponsiveBar.jsx
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const MyGolfResponsiveBar = ({ groupMode, data }) => (
  <ResponsiveBar
    data={data}
    keys={[
      "구리G",
      "안성A",
      "안성N",
      "안성S",
      "진천J",
      "중원G",
      "천안C",
      "영주Y",
      "문경M",
      "인동I",
    ]}
    indexBy="날짜"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    groupMode={groupMode}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "월 표시",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "골프장",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyGolfResponsiveBar;
