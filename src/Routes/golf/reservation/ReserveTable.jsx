import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, styled } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';

// 컬러 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#01387f',
    color: theme.palette.common.white,
  },
}));

function ReserveTable() {
    const columns = [
        { id: 'id', label: 'NO', align: 'center' },
        { id: 'golf_date', label: '날짜', align: 'center' },
        { id: 'course_name', label: '코스', align: 'center', width: '30px' },
        { id: 'golf_time', label: '시간', align: 'center' },
        { id: 'greepee', label: '그린피', align: 'center' },
        { id: 'actions', label: '취소', align: 'center' },
      ];
      
      // 시간 설정 
  // const formatTime = (time) => {
  //   const date = new Date(`2000-01-01T${time}`);
  //   const hours = date.getHours().toString().padStart(2, '0');
  //   const minutes = date.getMinutes().toString().padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };
  // 예약 내역 불러오기 
  useEffect(() => {

  })

   // 코스 테이블 이름 
//    const rows = courseList.map((course, index) => ({
//     id: index + 1,
//     course_name: course.course_name,
//     greenpee: course.greenpee,
//     golf_date: course.golf_date,
//     golf_time: formatTime(course.golf_time),
//     // actions: <Button onClick={() => handleButtonClick(course)}>예약</Button>,
//   }));

    return (
        <Container>
      <div className="parent">
        <div className='internet'>
          <h2>예약내역</h2>
          <br />
        </div>
      </div>

      <Paper>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell className='table' key={column.id} align={column.align}>
                      {column.id === 'actions' ? row.actions : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </Container>
    )
}

export default ReserveTable;