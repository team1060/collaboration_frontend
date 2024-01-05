import Head from "./reservation/Head.jsx";
import './style/Reservation.scss'
import ReserveTable from "./reservation/ReserveTable";

// 예약확인 
function ReservationConfirm () {
    
    return(
      <div id='reserve'>
        <Head/>
        <ReserveTable/>
        </div>
    )
}

export default ReservationConfirm;