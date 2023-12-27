// import { useState } from "react";
import { Link } from "react-router-dom";
// import { Container, Grid } from "@mui/material";
import './style/HeaderStyle.scss';
import Header2 from "./Header2";



function Header() {


  return (
    <>

      <div className="HeaderContainer"
        style={{ marginBottom: "140px" }}
      >
        {/* <Container >
        <Grid container>
          <Grid item lg={3} md={4} sm={6}> */}



        <div id="header">
          <div className="inner">
            <h1 className="logo">
              <Link to="/">
                <img src="/img/img001.png" alt="logo" />
              </Link>
            </h1>
            <div className="util">
              <ul className="Ul">
                <li><Link to="/member/login">로그인</Link></li>
                <li><Link to="/member/join">회원가입</Link></li>

              </ul>
            </div>
            <button className="rBtn" id="my_reserve">나의 예약</button>
          </div>

          {/* gnb */}
          <div className="gnb">
            <nav>
              <ul className="Ul">
                <li>
                  <Link to="/">골프장</Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      <div><h3><Link to="/">골프장 메인</Link></h3></div>
                      <div><h3><Link to="/golf/info">골프장 상세조회</Link></h3></div>
                      <div><h3><Link to="/reservation">골프 예약</Link></h3></div>


                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/shop">상품</Link>
                  <div className="two-depth">
                    <div className="innerWrap">

                      <div><h3><Link to="/shop">상품 메인</Link></h3></div>
                      <div><h3><Link to="/product">상품 목록</Link></h3></div>
                      <div><h3><Link to="/product">결제 페이지</Link></h3></div>
                      {/* <div><h3><Link to="/">골프 용품</Link></h3></div> */}


                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/addr">배송</Link>
                  <div className="two-depth">
                    <div className="innerWrap">

                      <div><h3><Link to="/addr">배송지 목록</Link></h3></div>
                      <div><h3><Link to="/">배송지 등록 / 수정</Link></h3></div>

                      {/* <div><h3><Link to="/">위약 처리규정</Link></h3></div> */}

                    </div>
                  </div>
                </li>


                <li>
                  <Link to="/announcement">고객지원</Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      {/*  보드랑 자주묻는질문 별도인지? */}
                      <div><h3><Link to="/announcement">공지사항</Link></h3></div>
                      <div><h3><Link to="/faq">FAQ</Link></h3></div>


                    </div>
                  </div>
                </li>

                <li>
                  <Link to="/mypage">마이페이지</Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      <div>


                        <div><h3><Link to="/modify">회원정보수정</Link></h3></div>
                        <div><h3><Link to="/modify">회원탈퇴</Link></h3></div>
                      </div>

                      <div>
                        <div><h3><Link to="/out">장바구니</Link></h3></div>
                        <div><h3><Link to="/mypage">구매및취소</Link></h3></div>
                        <div><h3><Link to="/basket">구매내역</Link></h3></div>
                      </div>

                      <div>
                        <div><h3><Link to="/out">예약확인 및 취소</Link></h3></div>
                        <div><h3><Link to="/basket">상품평</Link></h3></div>
                      </div>


                    </div>
                  </div>
                </li>

              </ul>
            </nav>
          </div>
          {/* // gnb */}
        </div>
        {/* //header */}
        <div id="header2">
          <Header2 />
        </div>
        {/* </Grid>
        </Grid>
        </Container> */}
        {/* // header include 처리부분 */}


      </div>



    </>
  )
}

export default Header;