import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
function Head() {
  const [email, setEmail] = useState();

  useEffect(() => {
      if (ACCESS_TOKEN) {
        const token = jwtDecode(ACCESS_TOKEN);
        const userEmail = token.email;
        setEmail(userEmail);
        console.log(userEmail)
      }
    }, [email]);
  return (
    <div className="con">
      <div className='head'>
        <Container>
          <Grid className='atag' item lg={12} md={12} xs={12}>
            <Link to='/reservation/detail'>인터넷예약</Link>
            <Link to={`/reservation/confirm/${email}`}>예약확인</Link>
            <Link to={`/reservation/confirm/cancel/${email}`}>취소현황</Link>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Head;
