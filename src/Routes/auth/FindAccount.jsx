import { Container, Grid, TextField, Typography } from "@mui/material";
import './style/FindAccount.scss';
import Button from '@mui/material/Button';
import { useState } from "react";
import { pwSubmit, sendUserData } from "../../services/auth/Member";
import { useNavigate } from 'react-router-dom';

function FindAccount() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    const [value, setValue] = useState('');

    // 연락처
    const phoneHandler = (e) => {
        const onlyNumber = e.target.value.replace(/\D/g, '');
        const formatNumber = formatPhoneNumber(onlyNumber);
        setPhone_number(formatNumber);
      }

      const formatPhoneNumber = (number) => {
        if (number.length >= 10) {
          return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
        } else {
          return number;
        }
      }

    // 아이디 찾기 
    const emailHandleSubmit = async (e) => {
        e.preventDefault();
        if (name && phone_number) {
            const data = {
                name: name,
                phone_number: phone_number
            };
            try {
                const response = await sendUserData(data);
                const sendEmail = response.substring(0,2) + '**' + response.substring(8);
                alert(`${sendEmail} 이메일을 확인해주세요`);
                window.location.href="/"
            } catch (error) {
                alert('가입되지 않은 이메일입니다. 다시 확인해주세요')
                window.location.href="/"
            }
        }
    }

    // 비밀번호 찾기 이메일 인증 
    const handleEmailVerification = async () => {
        try {
          const response = await pwSubmit(email);
          console.log(response);
          if (response != null) {
            console.log("성공");
            alert('메일발송이 완료되었습니다.')
            setResponse(response);
          } else {
            alert('이메일 형식을 맞춰서 입력해주세요')
          }
        } catch (error) {
          console.error("이메일 전송 중 오류 발생:", error);
          alert('다시 시도해주세요')
        }
      };

    // 비밀번호 찾기 버튼클릭 
    const pwHandlerSubmit = async () => {
        if(response === value) {
            alert('인증번호 확인이 완료되었습니다.')
            navigate(`/member/modify/pw/${email}`);
        } else {
            alert('인증번호가 틀렸습니다. 다시 확인해주세요')
        }
    }


    return (
        <Container id="find">
            <div className="parent">
                <div className='internet'>
                    <h2>아이디 비밀번호 찾기</h2>
                    <br />
                </div>
                {/* 박스 */}
            </div>

            {/* 본문 */}

            <Grid container className="boxTop">
                <Grid item lg={6} md={6} xs={12}>
                    <div className="title">
                        <Typography variant="h6" style={{ marginTop: '30px' }}>
                            아이디 찾기
                        </Typography>
                    </div>
                    <form onSubmit={emailHandleSubmit}>
                        <div className="inner">
                            <Grid container>
                                <Grid item lg={2} md={2} xs={2}>
                                    <h4>이름</h4>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="이름을 입력해주세요"
                                        name="name"
                                        type="search"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="inner">
                            <Grid container>
                                <Grid item lg={2} md={2} xs={2}>
                                    <h4>전화번호</h4>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                    <TextField
                                        fullWidth
                                        id="phone_number"
                                        name="phone_number"
                                        label="전화번호를 입력해주세요"
                                        type="search"
                                        variant="standard"
                                        value={phone_number}
                                        onChange={phoneHandler}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className="bgbut">
                            <Button type="submit" variant="contained">조회</Button>
                        </div>
                    </form>
                </Grid>

                <Grid item lg={6} md={6} xs={12}>
                    <div className="title">
                        <Typography variant="h6" style={{ marginTop: '30px' }}>
                            비밀번호 찾기
                        </Typography>
                    </div>
                   
                        <div className="inner">
                            <Grid container>
                                <Grid item lg={2} md={2} xs={2} className="content">
                                    <h4>이메일</h4>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="이메일을 입력해주세요"
                                        type="search"
                                        variant="standard"
                                    />
                                </Grid>
                                <Button onClick={handleEmailVerification} variant="contained">인증</Button>
                            </Grid>
                        </div>
                        <div className="inner">
                            <Grid container>
                                <Grid item lg={2} md={2} xs={2}>
                                    <h4>인증번호</h4>
                                </Grid>
                                <Grid item lg={8} md={8} xs={8}>
                                    <TextField
                                        fullWidth
                                        id="value"
                                        label="인증번호를 입력해주세요"
                                        type="search"
                                        variant="standard"
                                        name="vlaue"
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    <div className="bgbut">
                        <Button variant="contained" type="submit" onClick={pwHandlerSubmit}>조회</Button>
                    </div>

                </Grid>
            </Grid>
            <div className="footer"></div>

        </Container>
    )
}

export default FindAccount;
