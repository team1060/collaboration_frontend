import { Container, Grid, Typography } from "@mui/material";
import Menu from "../Menu";
import '../style/Mypage.scss';
import MemberTop from "../MemberTop";


function Mypage() {
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
                            <h4>수량</h4>
                            <h4>주문금액</h4>
                            <h4>취소</h4>
                        </div>
                        <div className="ordercontent">
                            <div className="texttitle">
                                <img src="../img/product/1/20200916022941530_300.jpg" />
                            </div>
                            <h4>상품명</h4>
                            <h4>수량</h4>
                            <h4>주문금액</h4>
                            <h4>취소</h4>
                        </div>
                        <hr />
                    </Grid>
                </Grid>

            <div className="footer">
            </div>
        </Container>
    )
}

export default Mypage;