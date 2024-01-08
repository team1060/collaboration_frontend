import { Grid, Typography } from "@mui/material";
import AirplayIcon from '@mui/icons-material/Airplay';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Button from '@mui/material/Button';

function MemberTop() {
    return(
        <>
         <div className="box1">
            <img src="https://resource.golfzonmarket.com/webroot/prdimg/common/images/icon/new_grade6.png" alt=""></img>
            <Typography variant="h5" >
                <span>000님</span> 안녕하세요
            </Typography>
            <Button className="infoButton" variant="contained">회원정보수정</Button>
        </div>
        <Grid className="box2">
            <Grid className="boxtext">
                <Typography variant="h6">
                    주문정보
                </Typography>
            </Grid>
            <Grid className="boxicons">
                <div className="cir">
                    <div className="circle">
                        <AirplayIcon className="boxicon" />
                    </div>
                    <div className="number">
                        <Typography variant="h6" fontWeight="bold">
                            1
                        </Typography>
                        <Typography variant="h7">
                            결제완료
                        </Typography>
                    </div>
                </div>
                <div className="cir">
                    <div className="circle">
                        <ShoppingCartIcon className="boxicon" />
                    </div>
                    <div className="number">
                        <Typography variant="h6" fontWeight="bold">
                            2
                        </Typography>
                        <Typography variant="h7">
                            장바구니
                        </Typography>
                    </div>
                </div>
                <div className="cir">
                    <div className="circle">
                        <AddIcCallIcon className="boxicon" />
                    </div>
                    <div className="number">
                        <Typography variant="h6" fontWeight="bold">
                            3
                        </Typography>
                        <Typography variant="h7">
                            문의내역
                        </Typography>
                    </div>
                </div>
            </Grid>

        </Grid>
        </>
    )
}
export default MemberTop;