import { Link } from "react-router-dom";
import Header2 from "./Header2";
import { useState, useEffect } from "react";
import LoginModal from "../../core/login/LoginModal";
import { jwtDecode } from "jwt-decode";
import { getNickname, isAdmin } from "../../core/util/http/auth/Member";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
function Header() {
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState(false);
  // 이메일
  const [user, setUser] = useState("");
  const handleLogin = (loginData) => {
    console.log(loginData);
    setModal(false);
  };

  // 로그인한 유저
  useEffect(() => {
    const fetchData = async () => {
      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        const email = token.email;
        const UserData = await getNickname(email);
        setUser(UserData.nickname);
        try {
          const isAdminUser = await isAdmin(email);
          console.log(email);
          // console.log(isAdminUser);
          setAdmin(isAdminUser);
        } catch (error) {
          // 오류 처리
          console.error("Error fetching admin status:", error);
        }
      }
    };

    fetchData();
  }, []);

  // 로그아웃
  const Logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/";
  };

  const checkAccessToken = (e) => {
    if (!ACCESS_TOKEN) {
      // alert("로그인 후 이용이 가능합니다.");
      // e.preventDefault();
      // window.location.href = "/";
    } else {
    }
  };

  return (
    <>
      <div className="HeaderContainer" style={{ marginBottom: "140px" }}>
        <div id="header">
          <div className="inner">
            <h1 className="logo">
              <Link to="/">
                <img src="/img/logo/logo4.png" alt="logo" />
              </Link>
            </h1>
            <div className="util">
              <ul className="Ul">
                {user ? (
                  // Logged-in user
                  <>
                    <li style={{ color: "#000", fontSize: "12px" }}>
                      {user}님 환영합니다!
                    </li>
                    <li style={{ color: "#000", fontSize: "12px" }}>
                      <Link
                        onClick={() => {
                          Logout();
                        }}
                      >
                        로그아웃
                      </Link>
                    </li>
                  </>
                ) : (
                  // Non-logged-in user
                  <>
                    <li>
                      <LoginModal
                        open={modal}
                        onClose={() => setModal(false)}
                        onLogin={handleLogin}
                      />
                    </li>
                    <li>
                      <Link to="/member/join">회원가입</Link>
                    </li>
                  </>
                )}
                {admin ? (
                  // Admin
                  <li style={{ color: "#000", fontSize: "12px" }}>
                    <Link to="/admin" onClick={checkAccessToken}>
                      관리자페이지
                    </Link>
                  </li>
                ) : user ? (
                  // Logged-in user
                  <li style={{ color: "#000", fontSize: "12px" }}>
                    <Link to="/member/mypage/info" onClick={checkAccessToken}>
                      마이페이지
                    </Link>
                  </li>
                ) : (
                  // No admin and not logged in
                  <></>
                )}
              </ul>
            </div>
            <a href="/member/mypage/reserve">
              <button
                className="rBtn"
                id="my_reserve"
                onClick={checkAccessToken}
              >
                나의 예약
              </button>
            </a>
          </div>

          {/* gnb */}
          <div className="gnb">
            <nav>
              <ul className="Ul">
                <li>
                  <Link to="/">골프장</Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      <div>
                        <h3>
                          <Link to="/">골프장 메인</Link>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <Link to="/golf/info">골프장 상세조회</Link>
                        </h3>
                      </div>
                      {/* <div><h3><Link to="/reservation/detail">골프 예약</Link></h3></div> */}
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/product">상품</Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      {/* <div><h3><Link to="/shop">상품 메인</Link></h3></div> */}
                      <div>
                        <h3>
                          <Link to="/product">상품 목록</Link>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <Link
                            to="/member/mypage/info"
                            onClick={checkAccessToken}
                          >
                            주문 내역
                          </Link>
                        </h3>
                      </div>
                      {/* <div><h3><Link to="/">골프 용품</Link></h3></div> */}
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/reservation/detail" onClick={checkAccessToken}>
                    예약
                  </Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      <div>
                        <h3>
                          <Link
                            to="/reservation/detail"
                            onClick={checkAccessToken}
                          >
                            예약 하기
                          </Link>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <Link
                            to="/member/mypage/reserve"
                            onClick={checkAccessToken}
                          >
                            예약 내역
                          </Link>
                        </h3>
                      </div>

                      {/* <div><h3><Link to="/">위약 처리규정</Link></h3></div> */}
                    </div>
                  </div>
                </li>

                <li>
                  <Link to="/" style={{ pointerEvents: "none" }}>
                    고객지원
                  </Link>
                  <div className="two-depth">
                    <div className="innerWrap">
                      {/*  보드랑 자주묻는질문 별도인지? */}
                      <div>
                        <h3>
                          <Link to="/" style={{ pointerEvents: "none" }}>
                            공지사항
                          </Link>
                        </h3>
                      </div>
                      <div>
                        <h3>
                          <Link to="/" style={{ pointerEvents: "none" }}>
                            FAQ
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  {admin ? (
                    <>
                      <Link to="/admin" onClick={checkAccessToken}>
                        관리자페이지
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/member/mypage/info" onClick={checkAccessToken}>
                        마이페이지
                      </Link>
                      <div className="two-depth">
                        <div className="innerWrap">
                          <div>
                            <div>
                              <h3>
                                <Link
                                  to="/member/mypage/login/modify"
                                  onClick={checkAccessToken}
                                >
                                  회원정보수정
                                </Link>
                              </h3>
                            </div>
                            <div>
                              <h3>
                                <Link
                                  to="/member/mypage/login/remove"
                                  onClick={checkAccessToken}
                                >
                                  회원탈퇴
                                </Link>
                              </h3>
                            </div>
                          </div>

                          <div>
                            {/* <div><h3><Link to="/out">장바구니</Link></h3></div> */}
                            <div>
                              <h3>
                                <Link
                                  to="/member/mypage/reserve"
                                  onClick={checkAccessToken}
                                >
                                  예약내역
                                </Link>
                              </h3>
                            </div>
                            <div>
                              <h3>
                                <Link
                                  to="/member/mypage/cancel"
                                  onClick={checkAccessToken}
                                >
                                  취소내역
                                </Link>
                              </h3>
                            </div>
                            {/* <div><h3><Link to="/basket">구매내역</Link></h3></div> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
  );
}

export default Header;
