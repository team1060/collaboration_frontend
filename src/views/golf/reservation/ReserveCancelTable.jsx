import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { getReserve } from "../../../core/util/http/golf/apiReserve";
import { jwtDecode } from "jwt-decode";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01387f",
    color: theme.palette.common.white,
  },
}));
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
function ReserveCancelTable() {
  // const { email } = useParams();
  const email = "";
  const [userData, setUserData] = useState([]);

  const columns = [
    { id: "id", label: "NO", align: "center" },
    { id: "golf_date", label: "날짜", align: "center" },
    { id: "course_name", label: "코스", align: "center", width: "30px" },
    { id: "golf_time", label: "시간", align: "center" },
    { id: "greenpee", label: "그린피", align: "center" },
    { id: "cancelTime", label: "취소날짜", align: "center" },
  ];

  // 취소날짜 + 시간
  // 취소 날짜 형식 설정
  const formatCancelTime = (cancelTime) => {
    const date = new Date(cancelTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}/${hours}:${minutes}`;
  };

  // 시간 설정
  const formatTime = (time) => {
    const date = new Date(`2000-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
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
        }
      } catch (error) {
        throw error;
      }
    };

    fetchData(email);
  }, [email]);

  return (
    <Container>
      <div className="parent">
        <div className="internet">
          <h2>취소내역</h2>
          <br />
        </div>
      </div>

      <Paper>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table
            sx={{ minWidth: "550px" }}
            stickyHeader
            aria-label="sticky table"
          >
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
                .filter((data) => data.golf_status === 2)
                .map((data, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={data.reserve_no}
                  >
                    {columns.map((column) => (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.id === "id"
                          ? index + 1
                          : column.id === "golf_time"
                          ? formatTime(data[column.id])
                          : column.id === "greenpee"
                          ? formatGreen(data[column.id])
                          : column.id === "cancelTime"
                          ? formatCancelTime(data[column.id])
                          : data[column.id]}
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

export default ReserveCancelTable;
