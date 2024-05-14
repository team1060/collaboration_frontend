import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const RankTable = ({ data }) => {
  // 데이터를 총 합계에 따라 정렬하고, DataGrid 형식에 맞게 변환
  const sortedData = data.map((item, index) => ({
    id: index + 1,
    date: item.날짜,
    total: Object.keys(item).reduce((sum, key) => key !== '날짜' ? sum + item[key] : sum, 0)
  })).sort((a, b) => b.total - a.total);

  // 컬럼 정의
  const columns = [
    { field: 'id', headerName: '번호', width: 70 },
    { field: 'date', headerName: '날짜', width: 150 },
    { field: 'total', headerName: '총합', width: 150 },
    { field: 'total1', headerName: '테스트', width: 150 }
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={sortedData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default RankTable;
