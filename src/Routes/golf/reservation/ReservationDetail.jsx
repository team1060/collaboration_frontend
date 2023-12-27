import Head from "./Head";
import ReserveTable from "./ReserveTable";

// 예약확인 
function ReservationDetail () {
    return(
        <>
        <Head />
        {/* 예약 확인 테이블 */}
        <ReserveTable />
        </>
    )
}

export default ReservationDetail;