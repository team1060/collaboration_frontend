import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import './style/LoginModal.scss';
import { useState } from 'react';
import { loginMember } from '../services/auth/Member';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const titleStyle = {
  marginBottom: '20px',
};
const inputStyle = {
  marginBottom: '20px',
  width: '100%',
  background: '#f6f6f6',
  borderRadius: '5px',
};

const checkboxStyle = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyle = {
  color: '#01387F',
  marginLeft: 'auto',
};
const buttonStyle = {
  marginTop: '12px',
  marginBottom: '25px',
  width: '100%',
  height: '40px',
};

export default function LoginModal() {

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 로그인 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호 값 확인
    if (email && password) {
      const useData = {
        email: email,
        password: password
      };
      try {
        console.log(useData)
        await loginMember(useData);
        window.location.href = "/"
      } catch (error) {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.')
        console.log(error)
      }

    } else {
      alert('이메일과 비밀번호를 모두 입력하세요.');
    }
  };

  // 카카오로그인 
  const handleButtonClick = () => {
    window.location.href = 'http://localhost:8081/oauth/kakao';

  };

  const handleNaverButtonClick = () => {
    window.location.href = 'http://localhost:8081/oauth/naver';

  };
  return (
    <div id='LoginModal'>
      <button className='loginbutton' onClick={handleOpen}>
        로그인
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <div className="title">
            <Typography id="keep-mounted-modal-title" variant="h5" component="h2" sx={titleStyle}>
              골프의 민족
            </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <TextField
              sx={inputStyle}
              fullWidth
              label="이메일 입력"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={inputStyle}
              fullWidth
              label="비밀번호 입력"
              type='password'
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container alignItems="center">
              <Button onClick={handleButtonClick}>
                <img style={{ width: '30px' }} src='/img/icon/kakao.png'></img>
              </Button>
              <Button onClick={handleNaverButtonClick}>
                <img style={{ width: '30px' }} src='/img/icon/naver.png'></img>
              </Button>
              <a href='/member/find' style={linkStyle}>
                아이디/비밀번호 찾기
              </a>
            </Grid>
            <Button sx={buttonStyle} variant="contained" type='submit'>
              로그인
            </Button>
            <a href='/member/join' style={linkStyle}>
              계정이 없으신가요? | 회원가입
            </a>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
