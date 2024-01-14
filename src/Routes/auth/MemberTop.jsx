import { Grid, Typography } from "@mui/material";
import AirplayIcon from '@mui/icons-material/Airplay';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Button from '@mui/material/Button';
import { useState } from "react";
import { getNickname } from "../../services/auth/Member";
import { jwtDecode } from "jwt-decode";
import { getReserveCount } from "../../services/golf/apiReserve";
import { getpaymentByMemberCount } from "../../services/auth/MyPage";

const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')

function MemberTop() {
    const [user, setUser] = useState(null);
    const [orderCount, setOrderCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);

    useState(() => {
        const fetchData = async () => {
            if (ACCESS_TOKEN) {
                const token = jwtDecode(ACCESS_TOKEN);
                const email = token.email;
                const UserData = await getNickname(email);
                setUser(UserData.nickname);
                // 갯수 
                const userEmail = UserData.email;
                const reservationCount = await getReserveCount(userEmail);
                const orderCount = await getpaymentByMemberCount(userEmail);
                setReservationCount(reservationCount);
                setOrderCount(orderCount);
            }   

        }

        fetchData();
    }, [ACCESS_TOKEN]);

    return (
        <>
            <div className="box1">
                <img src="/img/icon/new_grade6.png" alt=""></img>
                <Typography variant="h5" >
                    <span>{user}님</span> 안녕하세요
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
                                {orderCount}
                            </Typography>
                            <Typography variant="h7">
                                주문완료
                            </Typography>
                        </div>
                    </div>
                    <div className="cir">
                        <div className="circle">
                            <ShoppingCartIcon className="boxicon" />
                        </div>
                        <div className="number">
                            <Typography variant="h6" fontWeight="bold">
                                {reservationCount}
                            </Typography>
                            <Typography variant="h7">
                                예약완료
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