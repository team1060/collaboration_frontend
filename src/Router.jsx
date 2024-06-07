import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AdminFooter from "./views/admin/AdminFooter";
import AdminHeader from "./views/admin/AdminHeader";
import GolfReserve from "./views/auth/mypage/GolfReserve";
import GolfReserveCancel from "./views/auth/mypage/GolfReserveCancel";
import MemberModify from "./views/auth/mypage/MemberModify";
import MemberModifyLogin from "./views/auth/mypage/MemberModifyLogin";
import MemberRemoveLogin from "./views/auth/mypage/MemberRemoveLogin";
import Mypage from "./views/auth/mypage/Mypage";
import Info from "./views/golf/Info";
import Reservation from "./views/golf/Reservation";
import ReservationConfirm from "./views/golf/ReservationConfirm";
import Infoinner from "./views/golf/infodetail/Infoinner";
import Footer from "./views/layout/Footer";
import Header from "./views/layout/Header";
import HomeList from "./views/main/Home";
import Pay from "./views/shop/Pay";
import Product from "./views/shop/Product";
import ProductInner from "./views/shop/ProductInner";
import PaymentSuccess from "./views/shop/product/PaymentSuccess";
import KakaoRedirectPage from "./core/login/KakaoRedirectPage";
import NaverRedirectPage from "./core/login/NaverRedirectPage";
import MemberJoin from "./core/login/MemberJoin";
import FindAccount from "./views/auth/FindAccount";
import MemberModifyPw from "./views/auth/MemberModifyPw";
import Admin from "./views/admin/Admin";
import AdminGolf from "./views/admin/Page/AdminGolf";
import AdminMember from "./views/admin/Page/AdminMember";
import AdminCourse from "./views/admin/Page/AdminCourse";
import AdminProduct from "./views/admin/Page/AdminProduct";
import AdminProductList from "./views/admin/Page/AdminProductList";
import ReserveCancelTable from "./views/golf/reservation/ReserveCancelTable";
import CustomerService from "./views/customer/CustomerService";
import Inquire from "./views/customer/QNA/Inquire";
import FAQ from "./views/customer/FAQ/FAQ";
import QNAList from "./views/customer/QNAList/QNAList";
import QNADetails from "./views/customer/QNAList/QNADetails";
import NoticeList from "./views/customer/notice/NoticeList";
import NoticeDetails from "./views/customer/notice/NoticeDetails";

// 메인
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
  useEffect(() => {
    const fetchData = async () => {
      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        const admin = token.email;
        console.log(admin);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* -----------------시큐리티----------------------------------------------- */}
        {/* 골프예약 */}
        <Route
          path="/reservation/detail"
          element={
            <MainLayout>
              <Reservation />
            </MainLayout>
          }
        />
        {/* 골프예약확인 */}
        <Route
          path="/reservation/confirm/:email"
          element={
            <MainLayout>
              <ReservationConfirm />
            </MainLayout>
          }
        />
        {/* 골프예약취소 */}
        <Route
          path="/reservation/confirm/cancel/:email"
          element={
            <MainLayout>
              <ReserveCancelTable />
            </MainLayout>
          }
        />
        {/* 결제페이지 */}
        <Route
          path="/product/pay"
          element={
            <MainLayout>
              <Pay />
            </MainLayout>
          }
        />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        {/* 마이페이지 */}
        <Route
          path="/member/mypage/info"
          element={
            <MainLayout>
              <Mypage />
            </MainLayout>
          }
        />
        {/* 회원정보 수정 로그인 */}
        <Route
          path="/member/mypage/login/modify"
          element={
            <MainLayout>
              <MemberModify />
            </MainLayout>
          }
        />
        {/* 회원정보 수정 */}
        <Route
          path="/member/mypage/modify"
          element={
            <MainLayout>
              <MemberModifyLogin />
            </MainLayout>
          }
        />
        {/*고객 센터 */}
        <Route
          path="/customerService"
          element={
            <MainLayout>
              <CustomerService />
            </MainLayout>
          }
        ></Route>
        {/* 1:1문의하기 */}
        <Route
          path="/customerService/QNA"
          element={
            <MainLayout>
              <Inquire />
            </MainLayout>
          }
        ></Route>
        {/* 자주찾는질문 */}
        <Route
          path="/customerService/FAQ"
          element={
            <MainLayout>
              <FAQ />
            </MainLayout>
          }
        ></Route>

        {/* 문의하기  */}
        <Route
          path="/customerService/QNAList"
          element={
            <MainLayout>
              <QNAList />
            </MainLayout>
          }
        />
        {/* 문의하기 상세내역 */}
        <Route
          path="/customerService/QNADetails"
          element={
            <MainLayout>
              <QNADetails />
            </MainLayout>
          }
        />
        {/* 공지사항  */}
        <Route
          path="/customerService/Notice"
          element={
            <MainLayout>
              <NoticeList />
            </MainLayout>
          }
        />
        {/* 공지사항t상세보기 */}
        <Route
          path="/customerService/NoticeDetails/:boardNo"
          element={
            <MainLayout>
              <NoticeDetails />
            </MainLayout>
          }
        />

        {/* 예약 내역 */}
        <Route
          path="/member/mypage/reserve"
          element={
            <MainLayout>
              <GolfReserve />
            </MainLayout>
          }
        />

        {/* 예약 취소 내역 */}
        <Route
          path="/member/mypage/cancel"
          element={
            <MainLayout>
              <GolfReserveCancel />
            </MainLayout>
          }
        />
        {/* 회원 탈퇴 */}
        <Route
          path="/member/mypage/login/remove"
          element={
            <MainLayout>
              <MemberRemoveLogin />
            </MainLayout>
          }
        />

        {/* -----------------노시큐리티----------------------------------------------- */}
        {/* 메인 라우트 */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomeList />
            </MainLayout>
          }
        />
        {/* 골프장 리스트  */}
        <Route
          path="/golf/info"
          element={
            <MainLayout>
              <Info />
            </MainLayout>
          }
        />
        <Route
          path="/golf/info/:golf_no"
          element={
            <MainLayout>
              <Infoinner />
            </MainLayout>
          }
        />

        {/* 상품 메인 목록  */}
        <Route
          path="/product"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        />
        <Route
          path="/product/view/:product_no"
          element={
            <MainLayout>
              <ProductInner />
            </MainLayout>
          }
        />
        {/* 배송 목록 배송지 등록 수정  */}
        {/* <Route path="/addr" element={<MainLayout><Addr /></MainLayout>} />
        <Route path="/detail" element={<MainLayout><Detail /></MainLayout>} /> */}

        {/* 로그인 회원 가입 */}
        <Route
          path="/oauth/redirected/kakao"
          element={<KakaoRedirectPage />}
        ></Route>
        <Route
          path="/oauth/redirected/Naver"
          element={<NaverRedirectPage />}
        ></Route>
        <Route
          path="/member/join"
          element={
            <MainLayout>
              <MemberJoin />
            </MainLayout>
          }
        />

        {/* 아이디/비밀번호 찾기 */}
        <Route
          path="/member/find"
          element={
            <MainLayout>
              <FindAccount />
            </MainLayout>
          }
        />
        <Route
          path="/member/modify/pw/:email"
          element={
            <MainLayout>
              <MemberModifyPw />
            </MainLayout>
          }
        />

        {/* 어드민 라우트 */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Admin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/golf"
          element={
            <AdminLayout>
              <AdminGolf />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/member"
          element={
            <AdminLayout>
              <AdminMember />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/course"
          element={
            <AdminLayout>
              <AdminCourse />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminLayout>
              <AdminProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/productlist"
          element={
            <AdminLayout>
              <AdminProductList />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
