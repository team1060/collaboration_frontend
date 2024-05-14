import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

// 아이콘 이미지 url 이라고 보면 됨
import BarChartIcon from "@mui/icons-material/BarChart"; // 통계
import GroupIcon from "@mui/icons-material/Group"; //회원
import WidgetsIcon from "@mui/icons-material/Widgets"; // 상품
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import EditIcon from "@mui/icons-material/Edit"; // 계시판
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // 상품관리
const drawerWidth = 240;

// 아이콘 박스
const conversionMap = {
  통계: BarChartIcon,
  회원목록: GroupIcon,
  상품목록: WidgetsIcon,
  상품관리: AddShoppingCartIcon,
  게시판관리: EditIcon,
  골프장관리: GolfCourseIcon,
};
// 영한 닉네임
const convertToEnglishName = (koreanName) => {
  const conversionMap = {
    통계: "admin",
    회원목록: "admin/member",
    상품목록: "admin/productlist",
    상품관리: "admin/Product",
    게시판관리: "admin/board",
    골프장관리: "admin/course",

    //사이드바 한글이름 영어로 url 추가하기 이름에 한글이름 제거 하기
  };

  // 변환 맵에서 찾아서 반환, 없으면 그대로 반환
  return conversionMap[koreanName] || koreanName;
};
const AdminHeader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Link to={"/admin"}>GOLFZONE</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["통계", "회원목록", "상품목록"].map((text, index) => (
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
            {["상품관리", "게시판관리", "골프장관리"].map((text, index) => (
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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Toolbar />
        <Typography paragraph>
          r morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default AdminHeader;
