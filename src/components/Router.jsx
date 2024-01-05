import { BrowserRouter, Routes , Route} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
// 메인
import HomeList from "../Routes/main/Home"; // 메인 홈페이지 
import EventDetail from "../Routes/main/Page/EventDetail"; // 골프 
import Reservation from "../Routes/golf/Reservation.jsx"; // 골프 예매 페이지 
import ReservationConfirm from "../Routes/golf/reservation/ReservationConfirm.jsx";
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
// 로그인 회원가입
import MemberJoin from './MemberJoin.jsx';
// 관리자 페이지 import 
import Admin from "../Routes/admin/Admin";
import AdminHeader from "../Routes/admin/AdminHeader";
import AdminFooter from "../Routes/admin/AdminFooter";
import AdminMember from "../Routes/admin/AdminMember";
import Infoinner from "../Routes/golf/infodetail/Infoinner.jsx";
import AdminGolf from "../Routes/admin/Page/AdminGolf.jsx";
import AdminCourse from "../Routes/admin/Page/AdminCourse.jsx";

import ProductInner from "../Routes/shop/ProductInner.jsx";
// 공통 레이아웃 컴포넌트
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <>
    <AdminHeader />
    {children}
    <AdminFooter />
  </>
);

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
        <Route path="/reservateion/confirm/:email" element={<MainLayout><ReservationConfirm /></MainLayout>} />
        <Route path="/golf/info" element={<MainLayout><Info /></MainLayout>} /> 
        <Route path="/golf/info/:golf_no" element={<MainLayout><Infoinner /></MainLayout>} /> 

        {/* 골프장 예매 상세페이지 */}

        <Route path="/reservation/:eventname" element={<MainLayout><EventDetail /></MainLayout>} /> 
          {/* 상품 메인 목록  */}
        <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
        <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/product/pay" element={<MainLayout><Pay /></MainLayout>} />
        <Route path="/product/view/:product_no" element={<MainLayout><ProductInner /></MainLayout>} />
        {/* 배송 목록 배송지 등록 수정  */}
        <Route path="/addr" element={<MainLayout><Addr/></MainLayout>} />
        <Route path="/detail" element={<MainLayout><Detail/></MainLayout>} />
        {/* 로그인 회원 가입 */}
        <Route path="/member/join" element={<MainLayout><MemberJoin/></MainLayout>} />
        {/* <Route path="/member" element={<MainLayout><Member/></MainLayout>} /> */}



        {/* 어드민 라우트 */}
        <Route
          path="/admin/*"
          element={<AdminLayout>
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/golf" element={<AdminGolf />} />
              <Route path="/member" element={<AdminMember/>} />
              <Route path="/mart" element={<div>상품 목록 페이지</div>} />
              <Route path="/course" element={<AdminCourse/>} />
            </Routes>
          </AdminLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;