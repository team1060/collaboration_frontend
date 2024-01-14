import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Menu from "../Menu";
import '../style/Mypage.scss';
import MemberTop from "../MemberTop";
import { orderHistory } from "../../../services/auth/MyPage";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

function Mypage() {
    const [user, setUser] = useState('');
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = jwtDecode(ACCESS_TOKEN);
                const userEmail = token.email;
                setUser(userEmail);

                const email = userEmail;
                const result = await orderHistory(email);
                setOrderHistoryData(result);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchData();
    }, []);

    const isCancellationPossible = (orderDate) => {
        // 현재 날짜 구하기
        const currentDate = new Date();
        // 주문일자로부터 1일 추가
        const cancellationDate = new Date(orderDate);
        cancellationDate.setDate(cancellationDate.getDate() + 1);

        // 취소 가능 여부 판단
        return currentDate < cancellationDate;
    };

    return (
        <Container>
            <div className="parent">
                <div className='internet'>
                    <h2>주문관리</h2>
                    <br />
                </div>
                {/* 박스 */}
            </div>

            {/* 회원 정보 */}
            <MemberTop />

            {/* 마이페이지 하단 */}
            <Grid container className="menu">
                <Grid item lg={2} md={2} xs={3} className="menuinner">
                    <Menu />
                </Grid>
                {/* 본문 */}
                <Grid item lg={10} md={10} xs={12} className="content">
                    <Typography variant="h5" className="title">
                        주문내역
                    </Typography>
                    <hr />
                    <TableContainer>
                        <Table className="table">
                            <TableHead className="thead">
                                <TableRow>
                                    <TableCell>상품명</TableCell>
                                    <TableCell>주문일시</TableCell>
                                    <TableCell>주문금액</TableCell>
                                    <TableCell>취소</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="tbody">
                                {orderHistoryData.map(order => (
                                    <TableRow key={order.p_buy_no}>
                                        <TableCell className="tproduct">
                                            <img className="timage" src={order.path} alt={`Product ${order.product_no}`} />
                                            <div className="tproducttit">{order.product}</div>
                                        </TableCell>
                                        <TableCell>{order.payment_date}</TableCell>
                                        <TableCell>{parseFloat(order.amount).toLocaleString()}원</TableCell>
                                        <TableCell>
                                            {isCancellationPossible(order.payment_date) ? (
                                                <Button size="small">주문취소</Button>
                                            ) : (
                                                <Button size="small" disabled>취소불가</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <hr />
                </Grid>
            </Grid>

            <div className="footer">
            </div>
        </Container>
    )
}

export default Mypage;