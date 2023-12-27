// RankTable.jsx
import React from 'react';

const RankTable = ({ data }) => {
  // 데이터를 총 합계에 따라 정렬합니다.
  const sortedData = data
    .map(item => ({
      날짜: item.날짜,
      total: Object.keys(item).reduce((sum, key) => key !== '날짜' ? sum + item[key] : sum, 0)
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <table>
      <thead>
        <tr>
          <th>순위</th>
          <th>날짜</th>
          <th>총합</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.날짜}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankTable;
