import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Container, Typography, Grid, Button, ListItem } from '@mui/material';
import JoinData from './data/JoinData.js';
import '../components/style/MemberJoin.scss';
import { useEffect, useState } from 'react';
import { emailSubmit, getAllMembers, getEmail, registerMember } from '../services/auth/Member.js';

function MemberJoin() {
  const [open, setOpen] = React.useState([false, false, false, false]);
  // 모든 계정정보
  const [allEmail, setAllEmail] = useState([]);
  // username 
  const [username, setUsername] = useState("");
  // nickname
  const [nickname, setNickname] = useState("");

  // 중복확인
  const [inputValue, setInputValue] = useState("");
  // 비밀번호 이벤트
  const [pwInput, setPwInput] = useState("");
  const [viewMessage, setViewMessage] = useState("");
  const [pwViewMessage, setpwViewMessage] = useState("");
  const [pwCheckMessage, setPwCheckMessage] = useState("");
  // 연락처 
  const [phoneNumber, setPhoneNumber] = useState("");
  // 로그인 완료 후 메인화면으로 가기
  const history = useNavigate();

// 이메일 인증 버튼 클릭 시 호출되는 함수
const handleEmailVerification = async () => {
  try {
    const response = await emailSubmit(inputValue);
    console.log(response);
    if (response != null) {
      console.log("성공");
      alert('인증번호를 입력해주세요')
    } else {
    }
  } catch (error) {
    console.error("이메일 전송 중 오류 발생:", error);
  }
};


  // submit 
  const handleSubmit = async e  => {
    e.preventDefault();
  
    // 필수 약관 체크 여부 확인
    if (!checked[0] || !checked[1]) {
      console.log("필수 약관에 동의해주세요.");
      return;
    }

    const userData = {
      email: inputValue,
      password: pwInput,
      nickname: nickname,
      username: username,
      phone_number: phoneNumber,
      type: 0,
      auth_data: 0,
      is_sms_consent: checked[2] ? 1 : 0,
      is_email_consent: checked[3] ? 1 : 0
  };

    const request = await registerMember(userData);
    history('/');
    console.log(userData)
  }

  // 이메일 핸들러 
  const emailHandler = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(value);
    const isDuplicate = allEmail.some((item) => item.email === value);
    if (isDuplicate || !isEmailValid) {
      console.log("사용불가능한 아이디입니다.");
      setViewMessage("사용불가능한 이메일입니다.");
    } else {
      console.log("사용가능한 아이디입니다.");
      setViewMessage("사용가능한 이메일입니다.");
    }
  };

  // 비밀번호 핸들러 
  const dataPwHandler = (e) => {
    const value = e.target.value;
    setPwInput(value);

    // 비밀번호 유효성 검사 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    const isPasswordValid = passwordRegex.test(value);

    if (!isPasswordValid) {
      setpwViewMessage("비밀번호는 8~16자 영문, 숫자, 특수문자를 포함해야 합니다.")
    } else {
      setpwViewMessage("유효한 비밀번호 형식입니다.")
    }
  }
  // 비밀번호 체크 여부 
  const dataPwCheckHandler = (e) => {
    const value = e.target.value;
    // 비밀번호 확인 값이 비밀번호와 일치하는지 확인
    if (pwInput === value) {
      setPwCheckMessage("비밀번호가 일치합니다.");
    } else {
      setPwCheckMessage("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  // 연락처 핸들러 
  const phoneHandler = (e) => {
    const onlyNumber = e.target.value.replace(/\D/g, '');
    const formatNumber = formatPhoneNumber(onlyNumber);
    setPhoneNumber(formatNumber);
  }
  const formatPhoneNumber = (number) => {
    if (number.length >= 10) {
      return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    } else {
      // 10자리 미만이면 그대로 반환
      return number;
    }
  }
  // 콜랩스
  const handleClick = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  // 체크박스
  const [checked, setChecked] = React.useState([false, false, false, false]);

  // 전체선택
  const handleCheckAll = (event) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
  };

  // 한개선택
  const handleChange = (index) => (event) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // 체크박스
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, marginBottom: '10px' }}>
      {JoinData.map((JoinData, index) => (
        <React.Fragment key={index}>
          <Grid container>
            <FormControlLabel
              style={{ width: '360px' }}
              label={JoinData.label}
              control={<Checkbox checked={checked[index]} onChange={handleChange(index)} value={JoinData.value}/>}
            />

            <div className="butstyle">
              <ListItemButton onClick={() => handleClick(index)} style={{ justifyContent: 'end' }}>
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </div>
          </Grid>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem style={{ width: '400px', overflowY: 'auto', height: '200px', border: '1px solid #000' }}>
                  <ListItemText style={{height: '200px'}} primary={JoinData.text} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </React.Fragment>
      ))}
    </Box>
  );

  // email 전체 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllMembers();
        setAllEmail(userData);
      } catch (error) {
        // 에러 처리
      }
    };
    fetchData();
  }, []);

  return (
    <Container id='memberJoin'>
      <div className="joinbox">
        <div className="join">
          <h2>회원가입</h2>
          <br />
        </div>
      </div>
      <hr />
      <br />
      {/* 회원가입 폼 */}
      <form onSubmit={handleSubmit} action='/'>
        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            이메일
            <span>*</span>
          </Grid>
          <Grid container item xs={7} lg={6}>
            <TextField
              fullWidth
              required
              placeholder={'이메일을 입력해주세요'}
              name='email'
              id='email'
              autoComplete="email"
              onChange={emailHandler}
              value={inputValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
              }}
              error={viewMessage.includes("불가")}
            />
          </Grid>
            <Grid item xs={2} lg={1}><button onClick={handleEmailVerification}>인증</button></Grid>
        </Grid>
        

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext"></Grid>
          <Grid style={{ marginBottom: '10px', color: viewMessage.includes('불가능') ? 'red' : 'green' }} item xs={8} lg={7}>{viewMessage}</Grid></Grid>

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            비밀번호
            <span>*</span>
          </Grid>
          <Grid item xs={8} lg={7}>
            <TextField
              fullWidth
              required
              placeholder={'비밀번호를 입력해주세요'}
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={dataPwHandler}
              value={pwInput}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={pwViewMessage.includes("특수")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext"></Grid>
          <Grid style={{ marginBottom: '10px', color: pwViewMessage.includes('특수') ? 'red' : 'green' }} item xs={8} lg={7}>{pwViewMessage}</Grid></Grid>

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            비밀번호확인
            <span>*</span>
          </Grid>
          <Grid item xs={8} lg={7}>
            <TextField
              fullWidth
              required
              placeholder={'비밀번호를 입력해주세요'}
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={dataPwCheckHandler}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={pwCheckMessage.includes("일치하지 않습니다")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext"></Grid>
          <Grid style={{ marginBottom: '10px', color: pwCheckMessage.includes('일치하지 않습니다') ? 'red' : 'green' }} item xs={8} lg={7}>
            {pwCheckMessage}
          </Grid>
        </Grid>

        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            닉네임
            <span>*</span>
          </Grid>
          <Grid item xs={8} lg={7}>
            <TextField
              className='textInput'
              required
              fullWidth
              placeholder={'닉네임을 입력해주세요'}
              name='nickname'
              id='nickname'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            이름
            <span>*</span>
          </Grid>
          <Grid item xs={8} lg={7}>
            <TextField
              required
              className='textInput'
              fullWidth
              value={username}
              placeholder={'이름을 입력해주세요'}
              name='username'
              id='username'
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="inputfield">
          <Grid item xs={3} lg={2} className="inputtext">
            연락처
            <span>*</span>
          </Grid>
          <Grid item xs={8} lg={7}>
            <TextField
              required
              className='textInput'
              fullWidth
              placeholder={'- 없이 전화번호를 입력해주세요'}
              name='phone_number'
              id='phone_number'
              value={phoneNumber}
              onChange={phoneHandler}
              
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlideshowIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 13
              }}
            />
          </Grid>
        </Grid>
      


      {/* 이용약관 */}
      <div className="joinbox">
        <div>
          <h2>약관</h2>
          <br />
        </div>
      </div>
      {/* 체크박스 */}
      <div className="center">
        <div className="checksection">
          <div className="checkbox">
            <div className="leftsection">
              <div className="centeragree">
                <FormControlLabel
                  label={<Typography variant="h5">전체동의</Typography>}
                  control={
                    <Checkbox
                      checked={checked.every((value) => value)}
                      indeterminate={!checked.every((value) => value) && checked.some((value) => value)}
                      onChange={handleCheckAll}
                    />
                  }
                />
              </div>
              <br />
              <div className="textmargin">
                <Typography variant="h7">
                  골프의 민족의 모든 약관 및 마케팅 및 광고 활용 동의의 내용을 확인하고 동의합니다.
                </Typography>
              </div>
              <hr />
            </div>
          </div>
          <div className="checkbox">
            {children}
          </div>
        </div>
      </div>
      <div className="butsec"><Button className='joinbut' variant="contained" type='submit'>회원가입</Button></div>
      </form>
    </Container>
  );
}

export default MemberJoin;
