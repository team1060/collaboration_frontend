import { createTheme } from "@mui/material/styles";
import * as themeStyle from "./themeStyle";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          listStyle: "none",
        },

        html: {
          width: "100%",
          height: "100%",
          fontSize: themeStyle.$fontSize,
          color: themeStyle.$mainfontColor,
        },
        body: {
          width: "100%",
          height: "100%",
          color: "#1D1D1B",
          background: themeStyle.$whiteColor,
          fontSize: "1rem",
        },
        a: {
          textDecoration: "none",
          color: themeStyle.$whiteColor, // 추가
        },
        h1: {
          fontSize: themeStyle.$headline1,
          fontWeight: "bold",
        },
        h2: {
          fontSize: themeStyle.$headline2,
          fontWeight: "bold",
        },
        h3: {
          fontSize: themeStyle.$headline3,
          fontWeight: "bold",
        },
        ".menu": {
          fontSize: themeStyle.$menuTitle,
        },
        ".sub": {
          fontSize: themeStyle.$subTitle,
        },
        ".tit": {
          fontSize: themeStyle.$title1,
          fontWeight: "bold",
        },
        ".thead": {
          fontSize: themeStyle.$title2,
          fontWeight: "bold",
        },
        ".tbody": {
          fontSize: themeStyle.$body2,
        },
        button: {
          fontSize: themeStyle.$button,
        },
      },
    },
  },
  palette: {
    primary: {
      // 클레스네임에 들어가는 이름?
      main: themeStyle.$primaryColor,
    },
    secondary: {
      main: themeStyle.$redColor, // 보조 색상
    },
    background: {
      main: themeStyle.$skyblueBackground,
    },
  },
  typography: {
    fontFamily: ["Spoqa Han Sans Neo", "sans-serif"].join(","),
    "@import":
      "url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css')",
  },
});

export default theme;
