import { Container, Grid, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { sendPwData } from "../../services/auth/Member";

function MemberModifyPw () {

  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [newPw, setNewPw] = useState("");

  const pwChangHandler = async (e) => {
    e.preventDefault();

    if(password && newPw) {
      try{
        const data = {
          email : email,
          password: password
        }
        const response = await sendPwData(data);
      } catch(error) {
        console.error(error);
      }

    } else {
      alert('비밀번호를 입력해주세요')
    }
  }

    return(
      <Container id="find">
      <div className="parent">
          <div className='internet'>
              <h2>비밀번호 변경</h2>
              <br />
          </div>
          {/* 박스 */}
      </div>
      {email}
      <Grid container className="boxTop">
          <Grid item lg={12} md={12} xs={12}>
              <div className="title">
                  <Typography variant="h6" style={{ marginTop: '30px' }}>
                      비밀번호를 변경해주세요
                  </Typography>
              </div>
              <form onSubmit={pwChangHandler}>
                  <div className="inner">
                  <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                      <Grid item lg={2} md={2} xs={3} style={{marginRight: '10px'}}>
                              <h4>새 비밀번호</h4>
                          </Grid>
                          <Grid item lg={8} md={8} xs={8}>
                              <TextField
                                  fullWidth
                                  id="password"
                                  label="새 비밀번호를 입력해주세요"
                                  name="password"
                                  type="search"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  variant="standard"
                              />
                          </Grid>
                      </Grid>
                  </div>
                    <div className="inner">
                        <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                        <Grid item lg={2} md={2} xs={3} style={{marginRight: '10px'}}>
                                <h4>새 비밀번호 확인</h4>
                            </Grid>
                            <Grid item lg={8} md={8} xs={8}>
                                <TextField
                                    fullWidth
                                    id="newPw"
                                    name="newPw"
                                    label="새 비밀번호를 입력해주세요"
                                    type="search"
                                    variant="standard"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                  <div className="bgbut">
                      <Button type="submit" variant="contained">변경</Button>
                  </div>
              </form>
          </Grid>
      </Grid>
      <div className="footer"></div>

  </Container>
    )
}
export default MemberModifyPw;