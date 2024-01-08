import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container, styled } from "@mui/material";
import { getCourse } from '../../../services/golf/apiReserve';
import { postGolf } from '../../../services/golf/apiReserve';
import { tableCellClasses } from '@mui/material/TableCell';

const columns = [
  { id: 'id', label: 'NO', align: 'center' },
  { id: 'course_name', label: '코스', align: 'center', width: '30px' },
  { id: 'greenpee', label: '그린피', align: 'center' },
  { id: 'golf_date', label: '날짜', align: 'center' },
  { id: 'golf_time', label: '시간', align: 'center' },
  { id: 'actions', label: '예약', align: 'center' },
];

// 컬러 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#01387f',
    color: theme.palette.common.white,
  },
}));

const Course = ({ golf, index, view, user }) => {
  const [courseList, setCourseList] = useState([]);

  // golf_status가 1 인 리스트만 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourse();
        const golfStatus = courseData.filter(course => course.golf_status === 0 && course.golf_date === view && course.golf_no === index);
        setCourseList(golfStatus);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [golf, view, index]);

  // 시간 설정 
  const formatTime = (time) => {
    const date = new Date(`2000-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

// 예약 신청 
const handleButtonClick = async (course) => {
  try {
    const email = user;
    const plusData = { ...course, email };
    const today = new Date();

    // 예약 신청 alert
    const cancelDate = new Date(course.golf_date);
    cancelDate.setDate(cancelDate.getDate() - 7);

    const cancelYear = cancelDate.getFullYear();
    const cancelMonth = (cancelDate.getMonth() + 1).toString().padStart(2, '0');
    const cancelDay = cancelDate.getDate().toString().padStart(2, '0');


    const cancelMessage = cancelDate <= today
      ? '취소가 불가능한 예약입니다.'
      : `${cancelYear}-${cancelMonth}-${cancelDay}`;

    const userCheck = window.confirm(`
      예약정보를 확인해주세요 
      [예약날짜] ${course.golf_date} 
      [예약시간] ${formatTime(course.golf_time)} 
      [코스이름] ${course.course_name} 
      [예약취소 가능일] ${cancelMessage}
      예약하시겠습니까?`);

    if (userCheck) {
      await postGolf(plusData);
      alert('예약이 완료되었습니다.');
      window.location.reload();
    } else {
      alert('예약신청이 취소되었습니다.');
    }
  } catch (error) {
    console.error(error);
    alert('이미 예약이 완료된 코스입니다')
    window.location.reload();
  }
};

  // 코스 테이블 이름 
  const rows = courseList.map((course, index) => ({
    id: index + 1,
    course_name: course.course_name,
    greenpee: course.greenpee,
    golf_date: course.golf_date,
    golf_time: formatTime(course.golf_time),
    actions: <Button onClick={() => handleButtonClick(course)}>예약</Button>,
  }));

  return (
    <Container>
      <div className="parent">
        <div className='internet'>
          <h2>코스</h2>
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
              {rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell className='table' key={column.id} align={column.align}>
                      {column.id === 'actions' ? row.actions : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </Container>
  );
}

export default Course;
