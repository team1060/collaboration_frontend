import MemberTop from "../MemberTop";
import Menu from "../Menu";
import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getNickname } from "../../../services/auth/Member";
import { jwtDecode } from "jwt-decode";
import { NicknameUpdate, PwUpdate } from "../../../services/auth/MyPage";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
function MemberModify() {
    const [pwInput, setPwInput] = useState("");
    const [pwViewMessage, setpwViewMessage] = useState("");
    const [pwCheckMessage, setPwCheckMessage] = useState("");
    const [pwInputche, setPwInputche] = useState("");
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState([]);
    const [nickname, setNickname] = useState("");
    // 현재 비밀번호
    const [currentPw, setCurrentPw] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // 현재 비밀번호 이벤트 
    const currentPwHandler = (e) => {
        const value = e.target.value;
        setCurrentPw(value);
    }

    // 새 비밀번호 핸들러 
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
            setPwInputche(value);
        } else {
            setPwInputche(value);
            setPwCheckMessage("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
    };

    // 닉네임 변경 핸들러
    const newNicknameHandler = (e) => {
        const value = e.target.value;
        setNickname(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (ACCESS_TOKEN) {
                    const token = jwtDecode(ACCESS_TOKEN);
                    setEmail(token.email);
                    const userData = await getNickname(token.email);
                    setUserData(userData);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    // 비밀번호 submit 
    const pwChangeHandler = async (e) => {
        e.preventDefault();

        // 입력필드 완료 여부 확인 
    if (
      pwViewMessage.includes("특수") ||
      pwCheckMessage.includes("일치하지 않습니다") ||
      pwInput !== pwInputche
    ) {
      alert("문항들을 한번 더 확인해주세요!");
      return;
    }

        if (email && currentPw && pwInput) {
            const userData = {
                email: email,
                currentPassword: currentPw,
                password: pwInput
            } 
            try {
                const updateData = await PwUpdate(userData)
                if (updateData) {
                    alert('비밀번호 변경이 완료되었습니다.')
                    window.location.reload();
                } else {
                    alert('다시 시도해주세요')
                    window.location.reload();
                }
            } catch (error) {
                console.error(error)
                alert('현재 비밀번호를 다시 확인해주세요')
            }
        } else {
            alert('비밀번호를 입력해주세요!')
        }
    }

    // 닉네임 submit
    const nicknameChangHandler = async (e) => {
        e.preventDefault();
        if (!nickname) {
            alert('닉네임을 입력해주세요');
            return;
        }
        try{
            const data = {
                email: email,
                nickname: nickname
            }
            const response = await NicknameUpdate(data);
            if(response){
                alert('닉네임 변경이 완료되었습니다.')
                window.location.reload();
            } else {
                alert('다시 시도해주세요')
                window.location.reload();
            }
        }catch (error) {
            console.error(error)
        }
    }

    return (
        <Container>
            <div className="parent">
                <div className='internet'>
                    <h2>회원 정보 수정</h2>
                    <br />
                </div>
            </div>

            <MemberTop />
            {/* 비밀번호 */}
            <form onSubmit={pwChangeHandler}>
                <Grid container className="menu">
                    <Grid item lg={2} md={2} xs={3} className="menuinner">
                        <Menu />
                    </Grid>
                    {/* Dom warning 방지용 */}
                    <input type="text" name="username" autoComplete="username" style={{display:'none'}}/>
                    <Grid item lg={10} md={10} xs={12} className="content">
                        <div className="modifyTitle">
                            <Typography variant="h6">
                                비밀번호 변경
                            </Typography>
                        </div>
                        <hr />
                        <Grid container spacing={3} className="inputfield">
                            <Grid item xs={3} lg={2} className="inputtext">
                                현재 비밀번호
                                <span>*</span>
                            </Grid>
                            <Grid item xs={8} lg={7}>
                                <TextField
                                    fullWidth
                                    label={'비밀번호를 입력해주세요'}
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    onChange={currentPwHandler}
                                    value={currentPw}
                                    autoComplete="current-password"
                                    InputProps={{
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
                                />
                            </Grid>
                        </Grid>
                        {/* 새비밀번호 */}
                        <Grid container spacing={3} className="inputfield">
                            <Grid item xs={3} lg={2} className="inputtext">
                                새 비밀번호
                                <span>*</span>
                            </Grid>
                            <Grid item xs={8} lg={7}>
                                <TextField
                                    fullWidth
                                    label={'비밀번호를 입력해주세요'}
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    onChange={dataPwHandler}
                                    value={pwInput}
                                    autoComplete="current-password"
                                    InputProps={{
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
                                    helperText={pwViewMessage}
                                />
                            </Grid>
                        </Grid>
                        {/* 새비밀번호 확인 */}
                        <Grid container spacing={3} className="inputfield">
                            <Grid item xs={3} lg={2} className="inputtext">
                                새 비밀번호 확인
                                <span>*</span>
                            </Grid>
                            <Grid item xs={8} lg={7}>
                                <TextField
                                    fullWidth
                                    label={'새 비밀번호를 입력해주세요'}
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={pwInputche}
                                    onChange={dataPwCheckHandler}
                                    autoComplete="current-password"
                                    InputProps={{
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
                                    helperText={pwCheckMessage}
                                />
                            </Grid>
                        </Grid>
                        <div className="but" style={{ marginLeft: '30px' }}><Button variant="contained" type='submit' style={{ width: '100px', marginTop: '50px', marginBottom: '50px' }}>확인</Button></div>
                    </Grid>
                </Grid>

            </form>

            {/* 닉네임 변경 */}
            <form onSubmit={nicknameChangHandler}>
                <Grid container className="menu">
                    <Grid item lg={2} md={2} xs={3} className="menuinner">
                    </Grid>

                    <Grid item lg={10} md={10} xs={12} className="content">

                        <div className="modifyTitle" style={{ marginTop: '30px' }}>
                            <Typography variant="h6">
                                닉네임 변경
                            </Typography>
                        </div>
                        <hr />
                        <Grid container spacing={3} className="inputfield">
                            <Grid item xs={3} lg={2} className="inputtext">
                                기존 닉네임
                            </Grid>
                            <Grid item xs={8} lg={7}>
                                <TextField
                                    fullWidth
                                    name='nickname'
                                    label={userData.nickname}
                                    // value={userData.nickname}
                                    autoComplete="nickname"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} className="inputfield">
                            <Grid item xs={3} lg={2} className="inputtext">
                                새 닉네임
                                <span>*</span>
                            </Grid>
                            <Grid item xs={8} lg={7}>
                                <TextField
                                    fullWidth
                                    label={'새 닉네임을 입력해주세요'}
                                    name='nickname'
                                    value={nickname}
                                    onChange={(e) => newNicknameHandler(e)}
                                />
                            </Grid>
                        </Grid>
                    <div className="but" style={{ marginLeft: '30px' }}><Button variant="contained" type='submit' style={{ width: '100px', marginTop: '50px'}}>확인</Button></div>
                    </Grid>
                </Grid>
            </form>
            <div className="footer"></div>
        </Container>
    )
}

export default MemberModify;