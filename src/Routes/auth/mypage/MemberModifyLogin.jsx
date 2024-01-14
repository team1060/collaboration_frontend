import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Button, Container, Grid, Typography, TextField } from "@mui/material";
import MemberTop from "../MemberTop";
import Menu from "../Menu";
import { MypageLogin } from "../../../services/auth/MyPage";
import { getNickname } from "../../../services/auth/Member";

function MemberModify() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        setEmail(token.email);
        const UserData = await getNickname(token.email);
        setServer(UserData.oauthServerType);
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = '/';
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const userData = {
        email: email,
        password: password
      };
      console.log(userData)
      try {
        await MypageLogin(userData);
        window.location.href = "/member/mypage/modify";
      } catch (error) {
        alert('비밀번호가 올바르지 않습니다.');
        console.error(error);
      }
    } else {
      alert('비밀번호를 입력하세요.');
    }
  };

  return (
    <Container>
      <div className="parent">
        <div className='internet'>
          <h2>회원관리</h2>
          <br />
        </div>
      </div>

      <MemberTop />

      <form onSubmit={handleSubmit}>
        <Grid container className="menu">
          <Grid item lg={2} md={2} xs={3} className="menuinner">
            <Menu />
          </Grid>

          <Grid item lg={10} md={10} xs={12} className="content">
            <div className="modify">
              <Typography className="textTop">
                ※ 회원정보는 개인정보처리방침에 따라 안전하게 보호되며 회원님의 동의 없이 공개 또는 제3자에게 제공하지 않습니다. <br />
                ※ 소셜로그인 회원님들은 개인정보 수정이 불가능합니다.
              </Typography>
            </div>

            <div className="modifyTitle">
              <Typography variant="h6">
                닉네임 & 비밀번호 수정
              </Typography>
            </div>
            <hr />

            <Grid container spacing={3} className="inputfield">
              <Grid item xs={3} lg={2} className="inputtext">
                이메일
              </Grid>
              <Grid container item xs={8} lg={7}>
                <TextField
                  fullWidth
                  name='email'
                  label="Email"
                  value={email}
                  autoComplete="email"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} className="inputfield inputBot">
              <Grid item xs={3} lg={2} className="inputtext">
                비밀번호
              </Grid>
              <Grid container item xs={8} lg={7}>
                <TextField
                  fullWidth
                  type='password'
                  name='password'
                  label="Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={server === 'NAVER' || server === 'KAKAO'}
                />
              </Grid>
            </Grid>

            <hr />

            <div className="modify">
              <Typography className="textTop">
                ※ 회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주시기 바랍니다.
              </Typography>
            </div>

            <div className="but">
              <Button variant="contained" type='submit' style={{ width: '100px' }}>
                확인
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>

      <div className="footer"></div>
    </Container>
  );
}

export default MemberModify;
