import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Container, styled } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { cancelGolf, getReserve } from '../../../services/golf/apiReserve';
import { useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#01387f',
    color: theme.palette.common.white,
  },
}));

function ReserveTable() {
  const { email } = useParams();
  const [userData, setUserData] = useState([]);

  const columns = [
    { id: 'id', label: 'NO', align: 'center' },
    { id: 'golf_date', label: '날짜', align: 'center' },
    { id: 'course_name', label: '코스', align: 'center', width: '30px' },
    { id: 'golf_time', label: '시간', align: 'center' },
    { id: 'greenpee', label: '그린피', align: 'center' },
    { id: 'cancelTime', label: '취소날짜', align: 'center' },
  ];

  useEffect(() => {
    const fetchData = async (email) => {
      try {
        const userData = await getReserve(email);
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        // Handle error
      }
    }
    fetchData(email);
  }, [email]);

  return (
    <Container>
      <div className="parent">
        <div className='internet'>
          <h2>취소내역</h2>
          <br />
        </div>
      </div>

      <Paper>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
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
                .filter(data => data.golf_status === 2)
                .map((data, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.reserve_no}>
                    {columns.map((column) => (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.id === 'id' ? index + 1 : column.id }
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
