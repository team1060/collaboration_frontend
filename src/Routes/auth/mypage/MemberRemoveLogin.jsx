import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Button, Container, Grid, Typography, TextField } from "@mui/material";
import MemberTop from "../MemberTop";
import Menu from "../Menu";
import { removeMember } from "../../../services/auth/MyPage";

function MemberRemoveLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href="/";
  };

  useEffect(() => {
    const fetchData = async () => {
      const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        setEmail(token.email);
      }
    };

    fetchData();
  }, []);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(email && password){
      try {
        const userCheck = window.confirm(
          `탈퇴이후에는 30일 뒤에 재가입이 가능합니다.
          탈퇴 하시겠습니까?
          `
        )
        if(userCheck){
          // formData.append("email", email);
          // formData.append("password", password);
          // await removeMember(formData);
          await removeMember(email, password)
          alert('탈퇴가 완료되었습니다.')
          handleLogout();
        } else {
          alert('취소되었습니다.')
        }
      } catch (error) {
        alert('비밀번호가 맞지 않습니다. 다시 확인해주세요')
    }      
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

      <form onSubmit={handleSubmit2}>
        <Grid container className="menu">
          <Grid item lg={2} md={2} xs={3} className="menuinner">
            <Menu />
          </Grid>

          <Grid item lg={10} md={10} xs={12} className="content">
            <div className="modifyTitle">
              <Typography variant="h6">
                회원 탈퇴 신청
              </Typography>
            </div>

            <div className="modify borderBox">
              <div className="textinner">
                <span>* 회원탈퇴시 유의사항</span>
                <h5>
                  골프의 민족 회원 탈퇴 시 <span>30일 이내</span>에 같은 이메일로 재가입이 불가능합니다.<br />
                  골프장 예약내역과 상품 구매내역은 자동 삭제가 되지 않으며 탈퇴 후 삭제 등을 할 수 없으므로 반드시 <span>탈퇴 전 비공개 처리하거나 삭제</span>하시기 바랍니다.<br />
                  기타 탈퇴와 관련된 모든 정책은 골프의 민족 회원가입 시 동의하신 이용 약관 및 개인정보 제공, 활용 동의 내용에 따릅니다.
                </h5>
                <span>* 회원정보 보존 안내</span>
                <h5>
                  탈퇴 후 30일간 재가입 방지 및 부정 행위를 방지하기 위해 회원님의 아이디를 포함한 일부 회원 정보가 보존됩니다.<br />
                  (회원가입 시 동의하신 개인정보 처리 방침에 명시한 파기절차와 방법에 따라 30일 이후 회원 정보를 지체 없이 파기합니다)<br />
                  전자상거래 이용내역이 있는 회원님은 전자상거래 등에서의 소비자보호에 관한 법률에 의거 교환/반품/환불 및 사후처리 등을 위해 회원 정보가 관리됩니다.
                </h5>
              </div>
            </div>

            <Grid container spacing={3} className="inputfield" style={{marginLeft: '0px'}}>
              <Grid item xs={3} lg={2} className="inputtext">
                이메일
              </Grid>
              <Grid container item xs={8} lg={7}>
                <TextField
                  fullWidth
                  name='email'
                  label="Email"
                  id="email"
                  value={email}
                  autoComplete="email"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} className="inputfield inputBot" style={{marginLeft: '0px'}}>
              <Grid item xs={3} lg={2} className="inputtext">
                비밀번호
              </Grid>
              <Grid container item xs={8} lg={7}>
                <TextField
                  fullWidth
                  type='password'
                  name='password'
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            <hr />

            <div className="but">
              <Button variant="contained" type='submit' style={{ width: '100px', marginTop:'30px' }}>
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

export default MemberRemoveLogin;
