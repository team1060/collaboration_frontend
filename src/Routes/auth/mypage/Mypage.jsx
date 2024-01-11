import { Container, Grid, Typography } from "@mui/material";
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

    return (
        <Container>
            <div className="parent">
                <div className='internet'>
                    <h2>개인정보 수정</h2>
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
                    <div className="ordertext">
                        <div className="texttitle">상품</div>
                        <h4>상품명</h4>
                        <h4>주문일시</h4>
                        <h4>주문금액</h4>
                        <h4>취소</h4>
                    </div>
                    {orderHistoryData.map(order => (
                        <div className="ordercontent" key={order.p_buy_no}>
                            <div className="texttitle">
                                <img src={order.path} alt={`Product ${order.product_no}`} />
                            </div>
                            <h4>{order.product}</h4>
                            <h4>{order.payment_date}</h4>
                            <h4>{order.amount}</h4>
                            {/* <button onClick={() => handleCancelOrder(order.p_buy_no)}>취소</button> */}
                        </div>
                    ))}
                    <hr />
                </Grid>
            </Grid>

            <div className="footer">
            </div>
        </Container>
    )
}

export default Mypage;