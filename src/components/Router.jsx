import { BrowserRouter, useNavigate, } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
// 메인
import HomeList from "../Routes/main/Home"; // 메인 홈페이지 
import Reservation from "../Routes/golf/Reservation.jsx"; // 골프 예매 페이지 
import ReservationConfirm from "../Routes/golf/ReservationConfirm.jsx"; // 예약확인 
import ReserveCancel from "../Routes/golf/ReservationCancel.jsx" // 예약취소 

import Info from "../Routes/golf/Info";// 골프 목록 페이지 

// 상품
import Product from "../Routes/shop/Product";// 상품 목록 
import Pay from "../Routes/shop/Pay.jsx"; // 결제 페이지 

// 고객 지원
// 마이페이지 
import Mypage from "../Routes/auth/mypage/Mypage.jsx";
import MemberModifyLogin from "../Routes/auth/mypage/MemberModifyLogin.jsx";
import MemberModify from "../Routes/auth/mypage/MemberModify.jsx";
// 로그인 회원가입
import KakaoRedirectPage from "../components/KakaoRedirectPage.jsx"
import MemberJoin from './MemberJoin.jsx';
import NaverRedirectPage from "../components/NaverRedirectPage.jsx";
// 관리자 페이지 import 
import Admin from "../Routes/admin/Admin";
import AdminHeader from "../Routes/admin/AdminHeader";
import AdminFooter from "../Routes/admin/AdminFooter";
import AdminMember from "../Routes/admin/Page/AdminMember.jsx";
import Infoinner from "../Routes/golf/infodetail/Infoinner.jsx";
import AdminGolf from "../Routes/admin/Page/AdminGolf.jsx";
import AdminCourse from "../Routes/admin/Page/AdminCourse.jsx";
import AdminProduct from "../Routes/admin/Page/AdminProduct.jsx";
import AdminProductList from "../Routes/admin/Page/AdminProductList.jsx";

import ProductInner from "../Routes/shop/ProductInner.jsx";
import MemberRemoveLogin from "../Routes/auth/mypage/MemberRemoveLogin.jsx";
import GolfReserve from "../Routes/auth/mypage/GolfReserve.jsx";
import GolfReserveCancel from "../Routes/auth/mypage/GolfReserveCancel.jsx";
import FindAccount from "../Routes/auth/FindAccount.jsx";
import MemberModifyPw from "../Routes/auth/MemberModifyPw.jsx";

import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

// 공통 레이아웃 컴포넌트
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);


const AdminLayout = ({ children }) => {

  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
};
const Router = () => {

  const [token, setToken] = useState('');
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        setToken(token)
        const admin = token.email;
        console.log(admin)
        setAdmin(admin)
      }
    };

    fetchData();
  }, []);

  const Back = () => {
    alert("로그인 후 이용이 가능합니다.");
    window.location.href = "/";
  };

  const AdminBack = () => {
    alert("허용되지 않은 접근입니다.");
    window.location.href = "/";
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* -----------------시큐리티----------------------------------------------- */}
        {/* 골프예약 */}
        <Route path="/reservation/detail"
          element={ <MainLayout><Reservation /></MainLayout>} />
        {/* 골프예약확인 */}
        <Route path="/reservation/confirm/:email"
          element={token ? <MainLayout><ReservationConfirm /></MainLayout> : <Back />} />
        {/* 골프예약취소 */}
        <Route path="/reservation/confirm/cancel/:email"
          element={token ? <MainLayout><ReserveCancel /></MainLayout> : <Back />} />
        {/* 결제페이지 */}
        <Route path="/product/pay" element={token ? <MainLayout><Pay /></MainLayout> : <Back />} />

        {/* 마이페이지 */}
        <Route path="/member/mypage/info" element={token ? <MainLayout><Mypage /></MainLayout> : <Back />} />
        {/* 회원정보 수정 로그인 */}
        <Route path="/member/mypage/login/modify" element={token ? <MainLayout><MemberModifyLogin /></MainLayout> : <Back />} />
        {/* 회원정보 수정 */}
        <Route path="/member/mypage/modify" element={token ? <MainLayout><MemberModify /></MainLayout> : <Back />} />
        {/* 예약 내역 */}
        <Route path="/member/mypage/reserve" element={token ? <MainLayout><GolfReserve /></MainLayout> : <Back />} />
        {/* 예약 취소 내역 */}
        <Route path="/member/mypage/cancel" element={token ? <MainLayout><GolfReserveCancel /></MainLayout> : <Back />} />
        {/* 회원 탈퇴 */}
        <Route path="/member/mypage/login/remove" element={token ? <MainLayout><MemberRemoveLogin /></MainLayout> : <Back />} />

        {/* -----------------노시큐리티----------------------------------------------- */}
        {/* 메인 라우트 */}
        <Route
          path="/"
          element={<MainLayout><HomeList /></MainLayout>}
        />
        {/* 골프장 리스트  */}
        <Route path="/golf/info" element={<MainLayout><Info /></MainLayout>} />
        <Route path="/golf/info/:golf_no" element={<MainLayout><Infoinner /></MainLayout>} />

        {/* 상품 메인 목록  */}
        <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/product/view/:product_no" element={<MainLayout><ProductInner /></MainLayout>} />
        {/* 배송 목록 배송지 등록 수정  */}
        {/* <Route path="/addr" element={<MainLayout><Addr /></MainLayout>} />
        <Route path="/detail" element={<MainLayout><Detail /></MainLayout>} /> */}

        {/* 로그인 회원 가입 */}
        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />}></Route>
        <Route path="/oauth/redirected/Naver" element={<NaverRedirectPage />}></Route>
        <Route path="/member/join" element={<MainLayout><MemberJoin /></MainLayout>} />

        {/* 아이디/비밀번호 찾기 */}
        <Route path="/member/find" element={<MainLayout><FindAccount /></MainLayout>} />
        <Route path="/member/modify/pw/:email" element={<MainLayout><MemberModifyPw /></MainLayout>} />

        {/* 어드민 라우트 */}
        <Route path="/admin" element={admin ? <AdminLayout><Admin /></AdminLayout> : <AdminBack />} />
        <Route path="/admin/golf" element={admin ? <AdminLayout><AdminGolf /></AdminLayout> : <AdminBack />} />
        <Route path="/admin/member" element={admin ? <AdminLayout><AdminMember /></AdminLayout> : <AdminBack />} />

        <Route path="/admin/course" element={admin ? <AdminLayout><AdminCourse /></AdminLayout> : <AdminBack />} />
        <Route path="/admin/product" element={admin ? <AdminLayout><AdminProduct /></AdminLayout> : <AdminBack />} />
        <Route path="/admin/productlist" element={admin ? <AdminLayout><AdminProductList /></AdminLayout> : <AdminBack />} />



      </Routes>
    </BrowserRouter>
  );
}

export default Router;