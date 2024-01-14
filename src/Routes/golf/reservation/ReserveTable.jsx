import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Container, styled } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { cancelGolf, getReserve } from '../../../services/golf/apiReserve';
import { jwtDecode } from 'jwt-decode';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#01387f',
    color: theme.palette.common.white,
  },
}));
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
function ReserveTable() {
  // const { email } = useParams();
  // console.log(email)
  const email = ''
  const [userData, setUserData] = useState([]);

  const columns = [
    { id: 'id', label: 'NO', align: 'center' },
    { id: 'golf_date', label: '날짜', align: 'center' },
    { id: 'course_name', label: '코스', align: 'center', width: '30px' },
    { id: 'golf_time', label: '시간', align: 'center' },
    { id: 'greenpee', label: '그린피', align: 'center' },
    { id: 'actions', label: '취소', align: 'center' },
  ];

  // 예약 시간 
  const formatTime = (time) => {
    const date = new Date(`2000-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 그린피 
  const formatGreen = (amount) => {
    return Number(amount).toLocaleString();
  };

  useEffect(() => {
    const fetchData = async (email) => {
      try {
        if (ACCESS_TOKEN) {
          const token = jwtDecode(ACCESS_TOKEN);
          const email = token.email;
          const userData = await getReserve(email);
          setUserData(userData);
        } else {
          alert("로그인이 필요합니다.");
          window.location.href = '/';
        }

      } catch (error) {
        throw error;
      }
    };

    fetchData(email);
  }, [ACCESS_TOKEN]);

  // 예약 취소 
  const handleCancel = async (reserveNo, data) => {
    try {

      const userCheck = window.confirm(`
      취소정보를 확인해주세요 
      [예약날짜] ${data.golf_date} 
      [예약시간] ${formatTime(data.golf_time)} 
      [코스이름] ${data.course_name} 
      취소하시겠습니까?`);

      if (userCheck) {
        await cancelGolf(reserveNo);
        alert('취소 완료되었습니다.');
        window.location.reload();
      } else {
        alert('취소 신청이 취소되었습니다.');
      }

      // 예약이 취소되면 새로운 데이터로 업데이트
      const updatedUserData = await getReserve(email);
      setUserData(updatedUserData);
    } catch (error) {
      alert('다시 시도해주세요');
    }
  };

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
          <Table sx={{ minWidth: '550px' }} stickyHeader aria-label="sticky table">
            <TableHead>
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
              {userData
                .filter(data => data.golf_status === 1)
                .map((data, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.reserve_no}>
                    {columns.map((column) => (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.id === 'id' ? index + 1 : column.id === 'actions' ? (
                          <Button
                            onClick={() => handleCancel(data.reserve_no, data)}
                            disabled={Math.floor((new Date(data.golf_date) - new Date()) / (24 * 60 * 60 * 1000)) < 7}
                          >
                            {Math.floor((new Date(data.golf_date) - new Date()) / (24 * 60 * 60 * 1000)) < 7 ? "취소 불가" : "취소"}
                          </Button>
                        ) : column.id === 'golf_time' ? (
                          formatTime(data[column.id])
                        ) : column.id === 'greenpee' ? (
                          formatGreen(data[column.id])
                        ) : (
                          data[column.id]
                        )}
                      </StyledTableCell>
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

export default ReserveTable;
