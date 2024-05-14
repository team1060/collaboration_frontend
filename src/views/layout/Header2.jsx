import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginModal from "../../core/login/LoginModal";
import { Link } from "react-router-dom";
// 멤버
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { getNickname, isAdmin } from "../../core/util/http/auth/Member";
//아이콘
import HomeIcon from "@mui/icons-material/Home"; // 골프장 홈
import ZoomInIcon from "@mui/icons-material/ZoomIn"; // 골프장 상세조회
import EditCalendarIcon from "@mui/icons-material/EditCalendar"; //골프장 예약
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"; //상품메인
import WidgetsIcon from "@mui/icons-material/Widgets"; // 상품목록
import CreditCardIcon from "@mui/icons-material/CreditCard"; //결제 페이지
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // 배송지 목록
import BorderColorIcon from "@mui/icons-material/BorderColor"; // 배송지 등록 수정
import CampaignIcon from "@mui/icons-material/Campaign"; // 공지사항
import ContactSupportIcon from "@mui/icons-material/ContactSupport"; //자주묻는 질문

import AccountCircleIcon from "@mui/icons-material/AccountCircle"; //마이페이지
import PersonOffIcon from "@mui/icons-material/PersonOff"; // 회원 탈퇴
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; //회원정보 수정
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits"; // 구매 및 취소
import LocalMallIcon from "@mui/icons-material/LocalMall"; // 장바구니
import ArticleIcon from "@mui/icons-material/Article"; // 구매내역
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"; // 예약확인 및 취소

const drawerWidth = 240;

// 아이콘 박스
const conversionMap = {
  "골프장 메인": HomeIcon,
  "골프장 상세조회": ZoomInIcon,
  예약하기: EditCalendarIcon,
  상품메인: LocalGroceryStoreIcon,
  상품목록: WidgetsIcon,
  "결제 페이지": CreditCardIcon,
  "배송지 목록": LocalShippingIcon,
  예약내역: BorderColorIcon,
  공지사항: CampaignIcon,
  FAQ: ContactSupportIcon,
  마이페이지: AccountCircleIcon,
  회원탈퇴: PersonOffIcon,
  주문내역: ArticleIcon,
  회원정보수정: ManageAccountsIcon,
  "구매 및 취소": ProductionQuantityLimitsIcon,
  장바구니: LocalMallIcon,
  취소내역: AccessAlarmIcon,
  // '예약내역': RecommendIcon,
  // '나의 예약': NoteAltIcon,
};
// function navigateTo(path) {
//   const currentPath = window.location.pathname;

//   if (currentPath !== path) {
//     window.location.assign(path);
//   }
// }
// 영한 닉네임
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
const convertToEnglishName = (koreanName) => {
  const conversionMap = {
    "골프장 메인": "/",
    "골프장 상세조회": "golf/info",
    상품목록: "product",
    주문내역: "member/mypage/info",
    예약하기: "reservation/detail",
    예약내역: "member/mypage/reserve",
    공지사항: "/",
    FAQ: "/",
    회원정보수정: "member/mypage/login/modify",
    회원탈퇴: "member/mypage/login/remove",
    취소내역: "member/mypage/cancel",
    // '구매 및 취소': "",
    // '장바구니': "",
    // '예약확인 및 취소': "",
    // '상품평': "",
    // '나의예약': "",
    //사이드바 한글이름 영어로 url 추가하기 이름에 한글이름 제거 하기
    // 상품 목록 , 주문내역 ,예약하기, 예약내역, 공지사항, FAQ, 회원정보수정,ㅎ회원탈퇴, 예약내역 취소내역
  };
  // '/'로 설정된 항목이면 무시하고 빈 문자열 반환, 그 외에는 변환 맵에서 찾아서 반환
  // 안하면 오류 '//' 로 인식 일단 '/'로 읽고 던져야함
  if (conversionMap[koreanName] === "/") {
    return "";
  } else {
    return conversionMap[koreanName] || koreanName;
  }
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [admin, setAdmin] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [modal, setModal] = useState(false);
  const handleLogin = (loginData) => {
    console.log(loginData);
    setModal(false);
  };

  const [user, setUser] = useState("");

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
          console.log(isAdminUser);
          setAdmin(isAdminUser);
        } catch (error) {
          // 오류 처리
          console.error("Error fetching admin status:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  // 로그아웃
  const Logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              메인 메뉴
            </Typography>
          </div>

          <div className="logo">
            <Link to="/">
              <img src="/img/logo/header2Logo.png" alt="logo" />
            </Link>
          </div>

          <div className="util">
            <ul className="Ul" style={{ display: "flex", gap: "15px" }}>
              {user ? (
                <li style={{ color: "white", fontSize: "15px" }}>
                  {user}님 환영합니다!
                </li>
              ) : (
                <li>
                  <LoginModal
                    open={modal}
                    onClose={() => setModal(false)}
                    onLogin={handleLogin}
                  />
                </li>
              )}
              {user ? (
                <li style={{ color: "#000", fontSize: "15px" }}>
                  <Link
                    onClick={() => {
                      Logout();
                    }}
                  >
                    로그아웃
                  </Link>
                </li>
              ) : (
                ""
              )}
              {admin ? (
                // Admin
                <li style={{ color: "#000", fontSize: "15px" }}>
                  <Link to="/admin">관리자페이지</Link>
                </li>
              ) : user ? (
                // Logged-in user
                <li style={{ color: "#000", fontSize: "15px" }}>
                  <Link to="/member/mypage/info">마이페이지</Link>
                </li>
              ) : (
                // No admin and not logged in
                <li>
                  <Link to="/member/join">회원가입</Link>
                </li>
              )}
            </ul>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["골프장 메인", "골프장 상세조회"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${convertToEnglishName(text)}`}
              >
                <ListItemIcon>
                  {conversionMap[text] &&
                    React.createElement(conversionMap[text])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["상품목록", "주문내역"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${convertToEnglishName(text)}`}
              >
                <ListItemIcon>
                  {conversionMap[text] &&
                    React.createElement(conversionMap[text])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {["예약하기", "예약내역"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${convertToEnglishName(text)}`}
              >
                <ListItemIcon>
                  {conversionMap[text] &&
                    React.createElement(conversionMap[text])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {["공지사항", "FAQ"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${convertToEnglishName(text)}`}
              >
                <ListItemIcon>
                  {conversionMap[text] &&
                    React.createElement(conversionMap[text])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["회원정보수정", "회원탈퇴", "예약내역", "취소내역"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/${convertToEnglishName(text)}`}
                >
                  <ListItemIcon>
                    {conversionMap[text] &&
                      React.createElement(conversionMap[text])}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
