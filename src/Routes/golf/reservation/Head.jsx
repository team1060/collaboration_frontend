import { Container,  Grid } from '@mui/material';

function Head() {
  return (
    <div className="con">
        <div className='head'>
            <Container>
                    <Grid className='atag' item lg={12} md={12} xs={12}>
                            <a href='/reservation'>인터넷예약</a>
                            <a href='/reservateion/detail'>예약확인</a>
                            <a href='/can'>취소현황</a>
                    </Grid>
            </Container>
        </div>
    </div>
  )
}

export default Head;
