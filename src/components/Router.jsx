import { BrowserRouter, Routes , Route} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
// 메인
import HomeList from "../Routes/main/Home"; // 메인 홈페이지 
import EventDetail from "../Routes/main/Page/EventDetail"; // 골프 
import Reservation from "../Routes/golf/Reservation.jsx"; // 골프 예매 페이지 
import ReservationConfirm from "../Routes/golf/ReservationConfirm.jsx"; // 예약확인 
import ReserveCancel from "../Routes/golf/ReservationCancel.jsx" // 예약취소 

import Info from "../Routes/golf/Info";// 골프 목록 페이지 

// 상품
import Shop from "../Routes/shop/Shop"; //상품 메인
import Product from "../Routes/shop/Product";// 상품 목록 
import Pay from "../Routes/shop/Pay.jsx"; // 결제 페이지 
// 배송
import Addr from "../Routes/addr/Addr";
import Detail from "../Routes/addr/Detail";
// 고객 지원
// 마이페이지 
import Mypage from "../Routes/auth/mypage/Mypage.jsx";
import MemberModifyLogin from "../Routes/auth/mypage/MemberModifyLogin.jsx";
import MemberModify from "../Routes/auth/mypage/MemberModify.jsx";
// 로그인 회원가입
import MemberJoin from './MemberJoin.jsx';
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
import PaymentSuccess from "../Routes/shop/product/PaymentSuccess.jsx";

// 공통 레이아웃 컴포넌트
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
// const checkAdminAccess = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const accessGranted = user && ((user.type === "2" || user.type === "1") && user.role === "admin");
//   console.log(user, accessGranted); // Debugging
//   return accessGranted;
// };

const AdminLayout = ({ children }) => {
  // 관리자 권한 확인
  // const hasAdminAccess = checkAdminAccess();

  // if (!hasAdminAccess) {
  //   alert("비정상적인 접속입니다.");
  //   window.location.href = '/';
  //   return;
  // }

  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
};
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 라우트 */}
        <Route
          path="/"
          element={<MainLayout><HomeList /></MainLayout>}
        />
        {/* 골프장 상세페이지, 골프 예약 */}
        <Route path="/reservation/detail" element={<MainLayout><Reservation /></MainLayout>} />
        {/* 예약확인 */}
        <Route path="/reservation/confirm/:email" element={<MainLayout><ReservationConfirm /></MainLayout>} />
        <Route path="/reservation/confirm/cancel/:email" element={<MainLayout><ReserveCancel/></MainLayout>} />
        <Route path="/golf/info" element={<MainLayout><Info /></MainLayout>} /> 
        <Route path="/golf/info/:golf_no" element={<MainLayout><Infoinner /></MainLayout>} /> 

        {/* 골프장 예매 상세페이지 */}
        <Route path="/reservation/:eventname" element={<MainLayout><EventDetail /></MainLayout>} /> 
        {/* 상품 메인 목록  */}
        <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
        <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/product/pay" element={<MainLayout><Pay /></MainLayout>} />
        <Route path="/product/view/:product_no" element={<MainLayout><ProductInner /></MainLayout>} />
        <Route path="/payment/success" element={<MainLayout><PaymentSuccess /></MainLayout>} />
        {/* 배송 목록 배송지 등록 수정  */}
        <Route path="/addr" element={<MainLayout><Addr/></MainLayout>} />
        <Route path="/detail" element={<MainLayout><Detail/></MainLayout>} />
        {/* 로그인 회원 가입 */}
        <Route path="/member/join" element={<MainLayout><MemberJoin/></MainLayout>} />
        {/* 아이디/비밀번호 찾기 */}
        <Route path="/member/find" element={<MainLayout><FindAccount/></MainLayout>} />
        <Route path="/member/modify/pw/:email" element={<MainLayout><MemberModifyPw /></MainLayout>} />
        {/* 마이페이지 */}
        <Route path="/member/mypage/info" element={<MainLayout><Mypage/></MainLayout>} />
        {/* 회원정보 수정 로그인 */}
        <Route path="/member/mypage/login/modify" element={<MainLayout><MemberModifyLogin/></MainLayout>} />
        {/* 회원정보 수정 */}
        <Route path="/member/mypage/modify" element={<MainLayout><MemberModify /></MainLayout>} />
        {/* 예약 내역 */}
        <Route path="/member/mypage/reserve" element={<MainLayout><GolfReserve/></MainLayout>} />
        {/* 예약 취소 내역 */}
        <Route path="/member/mypage/cancel" element={<MainLayout><GolfReserveCancel/></MainLayout>} />
        {/* 회원 탈퇴 */}
        <Route path="/member/mypage/login/remove" element={<MainLayout><MemberRemoveLogin/></MainLayout>} />


        {/* 어드민 라우트 */}
        <Route
          path="/admin/*"
          element={<AdminLayout>
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/golf" element={<AdminGolf />} />
              <Route path="/member" element={<AdminMember/>} />
              
              <Route path="/course" element={<AdminCourse/>} />
              <Route path="/product" element={<AdminProduct/>} />
              <Route path="/productlist" element={<AdminProductList/>} />
            </Routes>
          </AdminLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;